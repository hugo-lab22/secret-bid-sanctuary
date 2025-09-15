import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AuctionStats } from "@/components/AuctionStats";
import { PropertyCard } from "@/components/PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Index = () => {
  // Mock property data
  const properties = [
    {
      id: "1",
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      image: property1,
      auctionEndTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      currentBids: 7,
      isActive: true,
    },
    {
      id: "2", 
      title: "Downtown Penthouse",
      location: "Manhattan, NY",
      price: "$4,200,000",
      image: property2,
      auctionEndTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      currentBids: 12,
      isActive: true,
    },
    {
      id: "3",
      title: "Waterfront Estate",
      location: "Malibu, CA", 
      price: "$6,750,000",
      image: property3,
      auctionEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      currentBids: 3,
      isActive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AuctionStats />
      
      {/* Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-luxury-navy mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover exceptional properties with encrypted bidding for ultimate privacy and fairness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fair Housing Auctions</h3>
              <p className="text-white/80">
                Revolutionizing real estate with fully encrypted bidding powered by FHE technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-white/80">
                <li>Encrypted Bidding</li>
                <li>Transparent Results</li>
                <li>Real-time Auctions</li>
                <li>Secure Payments</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Technology</h4>
              <ul className="space-y-2 text-white/80">
                <li>Fully Homomorphic Encryption</li>
                <li>Blockchain Security</li>
                <li>Smart Contracts</li>
                <li>Wallet Integration</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 Fair Housing Auctions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
