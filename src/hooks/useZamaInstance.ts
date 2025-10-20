import { useState, useEffect } from 'react';
import { createInstance, initSDK, SepoliaConfig } from '@zama-fhe/relayer-sdk/bundle';

export const useZamaInstance = () => {
  const [instance, setInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeZama = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize FHE SDK
        await initSDK();
        
        // Create Zama instance with Sepolia config
        const zamaInstance = await createInstance(SepoliaConfig);
        
        setInstance(zamaInstance);
      } catch (err) {
        console.error('Failed to initialize Zama instance:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    initializeZama();
  }, []);

  return { instance, isLoading, error };
};
