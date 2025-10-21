import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, ArrowRight, Users, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleEnterAuctions = () => {
    navigate('/live-auctions');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-auction py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 text-luxury-gold border-luxury-gold">
              <Shield className="h-4 w-4 mr-2" />
              Fully Homomorphic Encryption
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Secret Bid Sanctuary
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
              The world's first fully encrypted real estate auction platform. 
              Your bids remain completely private until auction close.
            </p>
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 text-luxury-navy font-semibold px-8 py-4 text-lg"
              onClick={handleEnterAuctions}
            >
              Enter Live Auctions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-luxury-navy mb-6">
              Revolutionary Privacy Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of secure bidding with Fully Homomorphic Encryption
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-gradient-card shadow-card">
              <div className="bg-luxury-navy/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-luxury-navy" />
              </div>
              <h3 className="text-2xl font-bold text-luxury-navy mb-4">Complete Privacy</h3>
              <p className="text-muted-foreground">
                Your bids are encrypted and remain completely private. No one can see your bid amount until the auction closes.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-gradient-card shadow-card">
              <div className="bg-luxury-navy/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-luxury-navy" />
              </div>
              <h3 className="text-2xl font-bold text-luxury-navy mb-4">FHE Technology</h3>
              <p className="text-muted-foreground">
                Powered by Zama's Fully Homomorphic Encryption, enabling computations on encrypted data without decryption.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-gradient-card shadow-card">
              <div className="bg-luxury-navy/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-luxury-navy" />
              </div>
              <h3 className="text-2xl font-bold text-luxury-navy mb-4">Transparent Results</h3>
              <p className="text-muted-foreground">
                Fair and transparent auction results with verifiable encryption and blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-auction">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by Premium Bidders
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join the exclusive community of privacy-conscious real estate investors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
              <p className="text-white/80">Verified Bidders</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">$50M+</h3>
              <p className="text-white/80">Total Volume</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
              <p className="text-white/80">Secure Operations</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
              <p className="text-white/80">Encrypted Bids</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-luxury-navy mb-6">
            Ready to Bid Privately?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join the future of private real estate auctions. Your bids, your privacy, your advantage.
          </p>
          <Button 
            size="lg" 
            className="bg-luxury-navy hover:bg-luxury-navy/90 text-white font-semibold px-8 py-4 text-lg"
            onClick={handleEnterAuctions}
          >
            Start Bidding Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <footer className="bg-luxury-navy text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Secret Bid Sanctuary. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;