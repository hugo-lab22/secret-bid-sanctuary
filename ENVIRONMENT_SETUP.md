# Environment Variables Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Blockchain Configuration
```env
# Sepolia Testnet RPC URL
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY

# Private key for contract deployment (keep secure!)
PRIVATE_KEY=your_private_key_here

# Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### Frontend Configuration
```env
# Chain ID for Sepolia testnet
NEXT_PUBLIC_CHAIN_ID=11155111

# RPC URL for frontend
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY

# WalletConnect project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Contract address (set after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address_here
```

## How to Get These Values

### 1. Infura API Key
1. Go to [infura.io](https://infura.io)
2. Create an account and new project
3. Copy the API key from your project dashboard

### 2. WalletConnect Project ID
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the Project ID

### 3. Private Key
1. Use MetaMask or another wallet
2. Export your private key (keep this secure!)
3. Ensure the wallet has Sepolia ETH for deployment

### 4. Etherscan API Key
1. Go to [etherscan.io](https://etherscan.io)
2. Create an account and generate API key
3. Use for contract verification

## Security Notes

- ⚠️ **Never commit `.env.local` to version control**
- 🔒 **Keep your private key secure and never share it**
- 🛡️ **Use environment variables for all sensitive data**
- 📝 **Use `.env.template` as a reference for required variables**

## Deployment

For production deployment on Vercel:
1. Add these environment variables in your Vercel dashboard
2. Use the same variable names but with `NEXT_PUBLIC_` prefix for frontend variables
3. Never expose private keys in frontend environment variables
