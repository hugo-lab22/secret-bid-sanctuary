import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Properties = () => {
  // Extended mock property data
  const properties = [
    {
      id: "1",
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      image: property1,
      auctionEndTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      currentBids: 7,
      isActive: true,
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
    },
    {
      id: "3",
      title: "Waterfront Estate",
      location: "Malibu, CA", 
      price: "$6,750,000",
      image: property3,
      auctionEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      currentBids: 3,
      isActive: false,
    },
    {
      id: "4",
      title: "Mountain Retreat",
      location: "Aspen, CO",
      price: "$3,950,000",
      image: property1,
      auctionEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      currentBids: 5,
      isActive: true,
    },
    {
      id: "5",
      title: "Historic Mansion",
      location: "Charleston, SC",
      price: "$5,200,000",
      image: property2,
      auctionEndTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      currentBids: 9,
      isActive: true,
    },
    {
      id: "6",
      title: "Lakefront Cabin",
      location: "Lake Tahoe, NV",
      price: "$1,750,000",
      image: property3,
      auctionEndTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      currentBids: 2,
      isActive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-luxury-navy mb-4">
              All Properties
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Browse our complete collection of premium properties available for encrypted bidding
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location, property type, or price range..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="estate">Estate</SelectItem>
                    <SelectItem value="mansion">Mansion</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under2m">Under $2M</SelectItem>
                    <SelectItem value="2m-5m">$2M - $5M</SelectItem>
                    <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                    <SelectItem value="over10m">Over $10M</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-luxury-navy mb-2">
                {properties.length} Properties Available
              </h2>
              <p className="text-muted-foreground">
                {properties.filter(p => p.isActive).length} active auctions
              </p>
            </div>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Listed</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;