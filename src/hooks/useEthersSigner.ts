import { useAccount, useWalletClient } from 'wagmi';
import { useMemo } from 'react';

export const useEthersSigner = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const signerPromise = useMemo(async () => {
    if (!walletClient) return null;
    return walletClient;
  }, [walletClient]);

  return signerPromise;
};
