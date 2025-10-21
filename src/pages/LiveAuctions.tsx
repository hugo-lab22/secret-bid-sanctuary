import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { BiddingModal } from "@/components/BiddingModal";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { useReadContract, usePublicClient } from "wagmi";
import contractABI from "@/lib/contractABI.json";
import { config } from "../../config";

const LiveAuctions = () => {
  console.log('[LIVE] LiveAuctions component rendered');
  console.log('[LIVE] Config debug:', {
    contractAddress: config.contractAddress,
    rpcUrl: config.rpcUrl,
    chainId: config.chainId
  });
  
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);

  const [liveAuctions, setLiveAuctions] = useState<any[]>([]);

  const contractAddress = useMemo(() => config.contractAddress as `0x${string}`, []);
  const { data: total } = useReadContract({
    address: contractAddress,
    abi: contractABI.abi,
    functionName: "propertyCounter",
  });
  const publicClient = usePublicClient();
  
  console.log('[LIVE] Wagmi client debug:', {
    publicClient: !!publicClient,
    contractAddress,
    total
  });

  useEffect(() => {
    console.log('[DATA] [Live] useEffect triggered, total:', total);
    const load = async () => {
      if (!total || typeof total !== "bigint") {
        console.log('[DATA] [Live] No total or not bigint, returning');
        return;
      }
      const count = Number(total);
      console.log('[DATA] [Live] propertyCounter =', count);
      const arr: any[] = [];
      for (let i = 0; i < count; i++) {
        const mapImagePath = (img: string | undefined, index: number) => {
          if (!img) return `/property-${(index%3)+1}.jpg`;
          if (img.startsWith('ipfs://')) {
            const key = img.replace('ipfs://','');
            const dict: Record<string,string> = {
              villa: '/property-1.jpg',
              pent: '/property-2.jpg',
              water: '/property-3.jpg',
            };
            return dict[key] || `/property-${(index%3)+1}.jpg`;
          }
          return img;
        };

        try {
          console.log('[DATA] [Live] Attempting to read property info for property', i);
          console.log('[DATA] [Live] Using RPC URL:', config.rpcUrl);
          console.log('[DATA] [Live] Using contract address:', contractAddress);
          
          const info = await publicClient!.readContract({
            address: contractAddress,
            abi: contractABI.abi as any,
            functionName: 'getPropertyInfo',
            args: [BigInt(i)],
            authorizationList: undefined,
          });
          console.log('[DATA] [Live] getPropertyInfo(', i, ')=', info);
          const [name, description, imageHash, reservePrice, currentBid, bidCount, isActive, isVerified, propertyOwner, highestBidder, startTime, endTime] = info as any;
          
          // Get encrypted data for decryption
          console.log('[DATA] [Live] Attempting to read encrypted data for property', i);
          const encryptedData = await publicClient!.readContract({
            address: contractAddress,
            abi: contractABI.abi as any,
            functionName: 'getPropertyEncryptedData',
            args: [BigInt(i)],
            authorizationList: undefined,
          });
          console.log('[DATA] [Live] getPropertyEncryptedData(', i, ')=', encryptedData);
          
          const mapped = {
            id: String(i),
            title: name || `Property #${i}`,
            location: description || 'Encrypted Location',
            price: `$${(Number(reservePrice) / 100).toLocaleString()}`, // Show actual reserve price
            image: mapImagePath(imageHash, i),
            auctionEndTime: new Date(Number(endTime) * 1000), // Convert from seconds to milliseconds
            currentBids: Number(bidCount) || 0,
            isActive: isActive,
            lastBidAmount: `$${(Number(currentBid) / 100).toLocaleString()}`, // Show actual current bid
            minimumBid: `$${(Number(reservePrice) / 100).toLocaleString()}`, // Show actual reserve price as minimum
            encryptedData: encryptedData, // Store encrypted data for potential decryption
          };
          console.log('[DATA] [Live] mapped property', i, 'isActive:', mapped.isActive, 'bidCount:', mapped.currentBids);
          arr.push(mapped);
        } catch (e) {
          console.warn('[DATA] [Live] getPropertyInfo error', i, e);
          const fallbackProperty = {
            id: String(i),
            title: `Property #${i}`,
            location: 'Encrypted Location',
            price: '$—',
            image: `/property-${(i % 3) + 1}.jpg`,
            auctionEndTime: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
            currentBids: 0,
            isActive: true,
            lastBidAmount: '$—',
            minimumBid: '$100,000', // Set a reasonable minimum bid
            encryptedData: null,
          };
          console.log('[DATA] [Live] fallback property', i, 'isActive:', fallbackProperty.isActive);
          arr.push(fallbackProperty);
        }
      }
      setLiveAuctions(arr);
      console.log('[DATA] [Live] items loaded:', arr.length);
      console.log('[DATA] [Live] liveAuctions state updated');
    };
    load();
  }, [total]);

  const handlePlaceBid = (property: any) => {
    console.log('[BID] Opening modal for property:', property);
    console.log('[BID] Current modal state:', isBiddingModalOpen);
    setSelectedProperty(property);
    setIsBiddingModalOpen(true);
    console.log('[BID] Modal should be open now');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-auction py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Live Auctions
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Active encrypted bidding sessions for premium properties
            </p>
          </div>

          {/* Simplified: remove live stats */}
        </div>
      </section>

      {/* Live Auctions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-luxury-navy mb-2">
                Active Auctions
              </h2>
              <p className="text-muted-foreground">
                Place encrypted bids on live properties
              </p>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
              LIVE
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              console.log('[DATA] [Live] Rendering liveAuctions:', liveAuctions.length, 'items');
              return null;
            })()}
            {liveAuctions.map((auction) => {
              const handleBidClick = () => {
                console.log('[BID] onPlaceBid callback called!', auction);
                handlePlaceBid(auction);
              };
              
              console.log('[BID] Rendering PropertyCard for', auction.id, 'with onPlaceBid:', !!handleBidClick, 'type:', typeof handleBidClick);
              
              return (
                <PropertyCard 
                  key={auction.id} 
                  id={auction.id}
                  title={auction.title}
                  location={auction.location}
                  price={auction.price}
                  image={auction.image}
                  auctionEndTime={auction.auctionEndTime}
                  currentBids={auction.currentBids}
                  isActive={auction.isActive}
                  onPlaceBid={handleBidClick}
                />
              );
            })}
          </div>

          {/* Auction Rules */}
          <div className="mt-16 bg-luxury-navy/5 rounded-lg p-8">
            <h3 className="text-xl font-bold text-luxury-navy mb-4">
              Auction Rules & Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Encrypted Bidding</h4>
                <p className="text-muted-foreground text-sm">
                  All bids are encrypted using Fully Homomorphic Encryption (FHE), ensuring complete privacy until auction close.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Bid Requirements</h4>
                <p className="text-muted-foreground text-sm">
                  Minimum bid increment of $50,000. Wallet must be connected and verified to participate.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Auction Close</h4>
                <p className="text-muted-foreground text-sm">
                  Bids are automatically decrypted and revealed when the timer reaches zero. Highest bid wins.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Payment</h4>
                <p className="text-muted-foreground text-sm">
                  Winners have 48 hours to complete payment. Escrow services available for secure transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BiddingModal
        isOpen={isBiddingModalOpen}
        onClose={() => {
          console.log('[BID] Closing modal');
          setIsBiddingModalOpen(false);
        }}
        property={selectedProperty}
      />
    </div>
  );
};

export default LiveAuctions;