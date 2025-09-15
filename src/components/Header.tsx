import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button";
import { Home, Gavel, Shield } from "lucide-react";

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-primary">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-luxury-navy">Fair Housing Auctions</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Powered by</span>
              <span className="font-semibold text-trust-blue">FHE</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/properties" className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-trust-blue transition-smooth">
              <Home className="h-4 w-4" />
              <span>Properties</span>
            </a>
            <a href="/live-auctions" className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-trust-blue transition-smooth">
              <Gavel className="h-4 w-4" />
              <span>Live Auctions</span>
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}