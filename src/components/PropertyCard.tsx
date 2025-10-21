import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Eye, Lock } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  auctionEndTime: Date;
  currentBids: number;
  isActive: boolean;
  onPlaceBid?: () => void;
}

export function PropertyCard({
  title,
  location,
  price,
  image,
  auctionEndTime,
  currentBids,
  isActive,
  onPlaceBid,
}: PropertyCardProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const endTime = auctionEndTime.getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${hours}h ${minutes}m`);
        }
      } else {
        setTimeLeft("Auction Ended");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [auctionEndTime]);

  return (
    <Card className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-auction transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant={isActive ? "default" : "secondary"}
            className={isActive ? "bg-success-green hover:bg-success-green" : ""}
          >
            {isActive ? "Live Auction" : "Upcoming"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/90 text-luxury-navy">
            <Lock className="h-3 w-3 mr-1" />
            Encrypted Bids
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-luxury-navy mb-2 group-hover:text-trust-blue transition-smooth">
          {title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Starting Bid</p>
            <p className="text-xl font-bold text-trust-blue">{price}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Encrypted Bids</p>
            <p className="text-lg font-semibold text-luxury-navy">{currentBids}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-warning-amber">
            <Clock className="h-4 w-4 mr-1" />
            <span className="font-medium">{timeLeft}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Eye className="h-4 w-4 mr-1" />
            <span>View Details</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          variant={isActive ? "bid" : "outline"} 
          size="default" 
          className="w-full"
          disabled={!isActive}
          onClick={(e) => {
            console.log('[BID] PropertyCard button clicked!', { 
              isActive, 
              onPlaceBid: !!onPlaceBid,
              onPlaceBidType: typeof onPlaceBid,
              onPlaceBidValue: onPlaceBid
            });
            e.preventDefault();
            e.stopPropagation();
            if (onPlaceBid && typeof onPlaceBid === 'function') {
              console.log('[BID] Calling onPlaceBid function');
              onPlaceBid();
            } else {
              console.log('[BID] onPlaceBid is not a function or is undefined');
            }
          }}
        >
              {isActive ? "Place Free Encrypted Bid" : "Auction Not Started"}
        </Button>
      </CardFooter>
    </Card>
  );
}