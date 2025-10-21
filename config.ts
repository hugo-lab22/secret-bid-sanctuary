// Configuration file for Secret Bid Sanctuary
export const config = {
  // Chain Configuration
  chainId: Number(import.meta.env.VITE_CHAIN_ID || 11155111), // Sepolia Testnet
  rpcUrl: (import.meta.env.VITE_RPC_URL as string) || "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",

  // Wallet Connect Configuration
  walletConnectProjectId: (import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string) || "",

  // Alternative RPC Configuration
  alternativeRpcUrl: "https://1rpc.io/sepolia",

// Contract Configuration
contractAddress: (import.meta.env.VITE_CONTRACT_ADDRESS as string) || "0x7F6dfA7EacC6E696A93756fB7f8f78b1C7cfC80a",
} as const;
