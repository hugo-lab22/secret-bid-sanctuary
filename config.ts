// Configuration file for Secret Bid Sanctuary
export const config = {
  // Chain Configuration
  chainId: Number(import.meta.env.VITE_CHAIN_ID || 11155111), // Sepolia Testnet
  rpcUrl: (import.meta.env.VITE_RPC_URL as string) || "https://1rpc.io/sepolia",

  // Wallet Connect Configuration
  walletConnectProjectId: (import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string) || "",

  // Alternative RPC Configuration
  alternativeRpcUrl: "https://1rpc.io/sepolia",

  // Contract Configuration
  contractAddress: (import.meta.env.VITE_CONTRACT_ADDRESS as string) || "",
} as const;
