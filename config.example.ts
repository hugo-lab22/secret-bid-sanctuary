// Example configuration file for Secret Bid Sanctuary
// Copy this file to config.ts and update with your values

export const config = {
  // Chain Configuration
  chainId: 11155111, // Sepolia Testnet
  rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY",
  
  // Wallet Connect Configuration
  walletConnectProjectId: "YOUR_WALLET_CONNECT_PROJECT_ID",
  
  // Infura Configuration
  infuraApiKey: "YOUR_INFURA_API_KEY",
  alternativeRpcUrl: "https://1rpc.io/sepolia",
  
  // Contract Configuration (set after deployment)
  contractAddress: "DEPLOYED_CONTRACT_ADDRESS_HERE",
} as const;
