import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useZamaInstance } from "@/hooks/useZamaInstance";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { usePlaceBid } from "@/hooks/useContract";
import { Lock, Wallet, Clock, DollarSign, Shield } from "lucide-react";

interface BiddingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export function BiddingModal({ isOpen, onClose, property }: BiddingModalProps) {
  const [bidAmount, setBidAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { instance } = useZamaInstance();
  const signerPromise = useEthersSigner();
  
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  
  const { writeContract: placeBidContract } = usePlaceBid();

  if (!property) return null;

  const handleSubmitBid = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to place a bid",
        variant: "destructive",
      });
      return;
    }

    if (!instance || !address || !signerPromise) {
      toast({
        title: "Missing Encryption Service",
        description: "FHE encryption service is not available",
        variant: "destructive",
      });
      return;
    }

    if (!bidAmount || parseFloat(bidAmount.replace(/[,$]/g, "")) < parseFloat(property.minimumBid.replace(/[,$]/g, ""))) {
      toast({
        title: "Invalid Bid Amount",
        description: `Minimum bid is ${property.minimumBid}`,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    try {
      const CONTRACT_ADDRESS = '0xB979D2a4D8795BffB02e987D45AaC9F562c070Be';
      const bidAmountValue = Math.floor(parseFloat(bidAmount.replace(/[,$]/g, "")) * 100); // Convert to cents for euint32
      
      // Create encrypted input using FHE
      const input = instance.createEncryptedInput(CONTRACT_ADDRESS, address);
      input.add32(bidAmountValue);
      
      // Encrypt the bid amount
      const encryptedInput = await input.encrypt();
      
      // Convert handles to proper format
      const convertHex = (handle: any): string => {
        if (typeof handle === 'string') {
          return handle.startsWith('0x') ? handle : `0x${handle}`;
        } else if (handle instanceof Uint8Array) {
          return `0x${Array.from(handle).map(b => b.toString(16).padStart(2, '0')).join('')}`;
        } else if (Array.isArray(handle)) {
          return `0x${handle.map(b => b.toString(16).padStart(2, '0')).join('')}`;
        }
        return `0x${handle.toString()}`;
      };
      
      const handles = encryptedInput.handles.map(convertHex);
      const inputProof = `0x${Array.from(encryptedInput.inputProof)
        .map(b => b.toString(16).padStart(2, '0')).join('')}`;
      
      // Call contract with encrypted data
      placeBidContract({
        args: [property.id, handles[0], inputProof],
        value: BigInt(bidAmountValue * 1e16), // Convert to wei for payment
      });
      
    } catch (err) {
      console.error('FHE encryption failed:', err);
      toast({
        title: "Encryption Failed",
        description: "Failed to encrypt bid amount. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle transaction success
  if (isSuccess) {
    toast({
      title: "Bid Submitted Successfully",
      description: "Your encrypted bid has been submitted to the blockchain",
    });
    setBidAmount("");
    onClose();
  }

  // Handle transaction error
  if (error) {
    toast({
      title: "Transaction Failed",
      description: error.message,
      variant: "destructive",
    });
  }

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue) {
      return "$" + parseInt(numericValue).toLocaleString();
    }
    return "";
  };

  const handleBidAmountChange = (value: string) => {
    setBidAmount(formatCurrency(value));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-trust-blue" />
            Place Encrypted Bid
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-luxury-navy">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.location}</p>
              </div>
              <Badge variant="secondary" className="bg-success-green/10 text-success-green">
                <Clock className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Current Price:</span>
                <p className="font-semibold">{property.lastBidAmount}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Total Bids:</span>
                <p className="font-semibold">{property.currentBids}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Bid Input */}
          <div className="space-y-3">
            <Label htmlFor="bidAmount">Your Bid Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => handleBidAmountChange(e.target.value)}
                placeholder="Enter bid amount"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum bid: <span className="font-semibold">{property.minimumBid}</span>
            </p>
          </div>

          {/* Encryption Info */}
          <div className="bg-trust-blue/5 border border-trust-blue/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-trust-blue mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-semibold text-trust-blue text-sm">Fully Encrypted Bidding</h4>
                <p className="text-xs text-muted-foreground">
                  Your bid will be encrypted using FHE technology and only revealed when the auction closes.
                  No one can see your bid amount until then.
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Status */}
          <div className={`flex items-center justify-between p-3 rounded-lg border ${
            isConnected 
              ? 'bg-success-green/5 border-success-green/20' 
              : 'bg-destructive/5 border-destructive/20'
          }`}>
            <div className="flex items-center gap-2">
              <Wallet className={`h-4 w-4 ${isConnected ? 'text-success-green' : 'text-destructive'}`} />
              <span className="text-sm font-medium">
                {isConnected ? 'Wallet Connected' : 'Wallet Not Connected'}
              </span>
            </div>
            <div className={`h-2 w-2 rounded-full animate-pulse ${
              isConnected ? 'bg-success-green' : 'bg-destructive'
            }`}></div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              variant="bid" 
              onClick={handleSubmitBid}
              disabled={isPending || isConfirming || submitting || !bidAmount || !isConnected || !instance}
              className="flex-1"
            >
              {isPending || isConfirming || submitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  {submitting ? 'Encrypting...' : isPending ? 'Confirming...' : 'Processing...'}
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Submit Encrypted Bid
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}