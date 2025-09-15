# Secret Bid Sanctuary 🏠🔒

A revolutionary property auction platform powered by **Fully Homomorphic Encryption (FHE)** technology, ensuring complete privacy and security in the bidding process.

## 🌟 Features

### 🔐 Privacy-First Architecture
- **FHE-Encrypted Bidding**: All bid amounts are encrypted using Fully Homomorphic Encryption
- **Zero-Knowledge Auctions**: Bids remain completely private until auction closure
- **Secure Settlement**: Automated and transparent fund transfers

### 🏘️ Property Management
- **Property Listing**: Secure property registration with verification system
- **Auction Management**: Automated auction lifecycle management
- **Impact Tracking**: Comprehensive reporting and analytics

### 💰 Advanced Bidding System
- **Real-time Bidding**: Live auction updates with encrypted bid processing
- **Reputation System**: Trust-based user reputation scoring
- **Multi-wallet Support**: Integration with popular Web3 wallets

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **RainbowKit** for wallet connectivity
- **Wagmi** for Ethereum interactions

### Blockchain
- **Solidity** smart contracts
- **FHEVM** for homomorphic encryption
- **Sepolia Testnet** for development

### Key Dependencies
```json
{
  "@rainbow-me/rainbowkit": "^2.2.8",
  "wagmi": "^2.9.0",
  "viem": "^2.33.0",
  "@fhevm/solidity": "latest"
}
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/hugo-lab22/secret-bid-sanctuary.git
   cd secret-bid-sanctuary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example configuration
   cp config.example.ts config.ts
   
   # Update with your values
   # Chain ID: 11155111 (Sepolia)
   # RPC URL: Your Infura/Alchemy endpoint
   # Wallet Connect Project ID: Your project ID
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables
```typescript
export const config = {
  chainId: 11155111, // Sepolia Testnet
  rpcUrl: "https://sepolia.infura.io/v3/YOUR_API_KEY",
  walletConnectProjectId: "YOUR_PROJECT_ID",
  contractAddress: "DEPLOYED_CONTRACT_ADDRESS",
};
```

### Wallet Configuration
The application supports multiple wallet providers through RainbowKit:
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- And more...

## 📱 Usage

### For Property Owners
1. **Connect Wallet**: Use the connect button in the header
2. **List Property**: Create a new property listing with details
3. **Set Auction Parameters**: Define reserve price and duration
4. **Monitor Bids**: Track encrypted bid activity
5. **Settle Auction**: Complete the auction and transfer ownership

### For Bidders
1. **Connect Wallet**: Ensure your wallet is connected
2. **Browse Properties**: Explore available auction properties
3. **Place Encrypted Bids**: Submit bids that remain private
4. **Track Auction Status**: Monitor live auction progress
5. **Claim Winnings**: Receive property ownership if you win

## 🔒 Security Features

### FHE Implementation
- **Encrypted Storage**: All sensitive data encrypted on-chain
- **Private Computation**: Bid processing without revealing amounts
- **Secure Reveal**: Controlled bid revelation at auction end

### Smart Contract Security
- **Access Controls**: Role-based permissions
- **Verification System**: Property and user verification
- **Reputation Management**: Trust-based user scoring

## 🚀 Deployment

### Vercel Deployment

1. **Prepare for deployment**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push to main branch

3. **Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
   ```

### Manual Deployment Steps

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting provider**
   - Upload the `dist` folder contents
   - Configure your web server
   - Set up environment variables

## 🧪 Testing

### Running Tests
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Test Coverage
- Smart contract functionality
- FHE encryption/decryption
- Wallet connectivity
- Auction lifecycle

## 📊 Smart Contract

### Contract Address
```
Sepolia: 0x[CONTRACT_ADDRESS]
```

### Key Functions
- `listProperty()`: Create new property auction
- `placeBid()`: Submit encrypted bid
- `endAuction()`: Close auction and determine winner
- `settleAuction()`: Transfer ownership and funds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://secret-bid-sanctuary.vercel.app](https://secret-bid-sanctuary.vercel.app)
- **Documentation**: [https://docs.secret-bid-sanctuary.com](https://docs.secret-bid-sanctuary.com)
- **Smart Contract**: [Sepolia Etherscan](https://sepolia.etherscan.io/address/CONTRACT_ADDRESS)

## 🙏 Acknowledgments

- **FHEVM Team** for the homomorphic encryption framework
- **RainbowKit** for wallet connectivity
- **Zama** for FHE technology innovation
- **OpenZeppelin** for secure smart contract libraries

---

**Built with ❤️ for the future of private, secure property auctions**