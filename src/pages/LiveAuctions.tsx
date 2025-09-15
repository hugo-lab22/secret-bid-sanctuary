import { useState } from "react";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { BiddingModal } from "@/components/BiddingModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Gavel } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const LiveAuctions = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);

  // Only active auction properties
  const liveAuctions = [
    {
      id: "1",
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      image: property1,
      auctionEndTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      currentBids: 7,
      isActive: true,
      lastBidAmount: "$2,850,000",
      minimumBid: "$2,900,000",
    },
    {
      id: "2", 
      title: "Downtown Penthouse",
      location: "Manhattan, NY",
      price: "$4,200,000",
      image: property2,
      auctionEndTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
      currentBids: 12,
      isActive: true,
      lastBidAmount: "$4,200,000",
      minimumBid: "$4,300,000",
    },
    {
      id: "4",
      title: "Mountain Retreat",
      location: "Aspen, CO",
      price: "$3,950,000",
      image: property3,
      auctionEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      currentBids: 5,
      isActive: true,
      lastBidAmount: "$3,950,000",
      minimumBid: "$4,050,000",
    },
  ];

  const handlePlaceBid = (property: any) => {
    setSelectedProperty(property);
    setIsBiddingModalOpen(true);
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

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Gavel className="h-6 w-6 text-white mr-2" />
                <span className="text-2xl font-bold text-white">
                  {liveAuctions.length}
                </span>
              </div>
              <p className="text-white/80">Active Auctions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-white mr-2" />
                <span className="text-2xl font-bold text-white">
                  {liveAuctions.reduce((sum, auction) => sum + auction.currentBids, 0)}
                </span>
              </div>
              <p className="text-white/80">Total Bids</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-white mr-2" />
                <span className="text-2xl font-bold text-white">Live</span>
              </div>
              <p className="text-white/80">Bidding Status</p>
            </div>
          </div>
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
            {liveAuctions.map((auction) => (
              <div key={auction.id} className="relative">
                <PropertyCard {...auction} />
                <div className="absolute bottom-4 left-4 right-4">
                  <Button
                    variant="bid"
                    className="w-full"
                    onClick={() => handlePlaceBid(auction)}
                  >
                    <Gavel className="h-4 w-4 mr-2" />
                    Place Encrypted Bid
                  </Button>
                </div>
              </div>
            ))}
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
        onClose={() => setIsBiddingModalOpen(false)}
        property={selectedProperty}
      />
    </div>
  );
};

export default LiveAuctions;