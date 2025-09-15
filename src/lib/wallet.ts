import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from '../../config';

export const wagmiConfig = getDefaultConfig({
  appName: 'Secret Bid Sanctuary',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
