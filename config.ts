// Configuration file for Secret Bid Sanctuary
export const config = {
  // Chain Configuration
  chainId: 11155111, // Sepolia Testnet
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY",
  
  // Wallet Connect Configuration
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_WALLET_CONNECT_PROJECT_ID",
  
  // Alternative RPC Configuration
  alternativeRpcUrl: "https://1rpc.io/sepolia",
  
  // Contract Configuration
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "", // Set after deployment
} as const;
