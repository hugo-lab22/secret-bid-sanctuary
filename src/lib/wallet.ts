import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { config } from '../../config';

export const wagmiConfig = getDefaultConfig({
  appName: 'Secret Bid Sanctuary',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(config.rpcUrl), // force stable RPC to avoid 404 on drpc
  },
  ssr: false,
});
