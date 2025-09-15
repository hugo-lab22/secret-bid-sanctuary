import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Shield, Clock } from "lucide-react";

export function AuctionStats() {
  const stats = [
    {
      icon: TrendingUp,
      label: "Active Auctions",
      value: "24",
      change: "+12%",
      positive: true,
    },
    {
      icon: Users,
      label: "Verified Bidders",
      value: "1,234",
      change: "+8%",
      positive: true,
    },
    {
      icon: Shield,
      label: "Encrypted Bids Today",
      value: "567",
      change: "+23%",
      positive: true,
    },
    {
      icon: Clock,
      label: "Avg. Auction Time",
      value: "7.2h",
      change: "-15%",
      positive: false,
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-luxury-navy mb-4">
            Live Auction Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time statistics showing the power of encrypted bidding in action
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white shadow-card hover:shadow-auction transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-trust-blue/10 flex items-center justify-center group-hover:bg-trust-blue/20 transition-smooth">
                      <IconComponent className="h-6 w-6 text-trust-blue" />
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.positive ? 'text-success-green' : 'text-warning-amber'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-2xl lg:text-3xl font-bold text-luxury-navy">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}