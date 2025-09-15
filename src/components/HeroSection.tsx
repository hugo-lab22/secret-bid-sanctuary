import { Button } from "@/components/ui/button";
import { Shield, Eye, Clock, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury property"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Fair Housing Auctions,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal-light to-white">
                Powered by FHE
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
              Experience the future of real estate bidding with fully encrypted bids, 
              ensuring complete privacy until auction close.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" className="text-lg">
                Explore Live Auctions
              </Button>
              <Button variant="outline" size="lg" className="text-lg border-white text-white hover:bg-white hover:text-luxury-navy">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean-teal-light mb-2">$2.4B</div>
                <div className="text-sm text-white/80">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean-teal-light mb-2">10K+</div>
                <div className="text-sm text-white/80">Encrypted Bids</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean-teal-light mb-2">100%</div>
                <div className="text-sm text-white/80">Privacy Protected</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-ocean-teal-light/20 flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-ocean-teal-light" />
                </div>
                <h3 className="text-xl font-semibold text-white">Fully Encrypted Bids</h3>
              </div>
              <p className="text-white/80">
                Your bids remain completely private using advanced FHE technology until auction close.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-success-green/20 flex items-center justify-center mr-4">
                  <Eye className="h-6 w-6 text-success-green-light" />
                </div>
                <h3 className="text-xl font-semibold text-white">Transparent Results</h3>
              </div>
              <p className="text-white/80">
                All bids are revealed simultaneously when the auction ends, ensuring fairness.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-warning-amber/20 flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-warning-amber" />
                </div>
                <h3 className="text-xl font-semibold text-white">Real-Time Auctions</h3>
              </div>
              <p className="text-white/80">
                Live countdown timers and instant bid confirmation for seamless experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white fill-current"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}