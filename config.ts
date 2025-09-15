// Configuration file for Secret Bid Sanctuary
export const config = {
  // Chain Configuration
  chainId: 11155111, // Sepolia
  rpcUrl: "https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990",
  
  // Wallet Connect Configuration
  walletConnectProjectId: "2ec9743d0d0cd7fb94dee1a7e6d33475",
  
  // Infura Configuration
  infuraApiKey: "b18fb7e6ca7045ac83c41157ab93f990",
  alternativeRpcUrl: "https://1rpc.io/sepolia",
  
  // Contract Configuration
  contractAddress: "", // Will be set after deployment
} as const;
