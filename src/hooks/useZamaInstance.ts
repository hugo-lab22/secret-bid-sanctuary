import { useState, useEffect } from 'react';
import { createInstance, initSDK, SepoliaConfig } from '@zama-fhe/relayer-sdk/bundle';

export const useZamaInstance = () => {
  const [instance, setInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeZama = async () => {
      console.log('[FHE] initializing SDK...');
      try {
        setIsLoading(true);
        setError(null);

        if (!(window as any).ethereum) {
          console.warn('[FHE] window.ethereum not found');
        }

        // init SDK and create instance (aidwell-connect style)
        await initSDK();
        console.log('[FHE] initSDK() done');

        const zamaInstance = await createInstance(SepoliaConfig);
        console.log('[FHE] createInstance(SepoliaConfig) ok');

        setInstance(zamaInstance);
      } catch (err) {
        console.error('[FHE] initialize error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    initializeZama();
  }, []);

  useEffect(() => {
    if (instance) {
      console.log('[FHE] instance available');
    }
  }, [instance]);

  return { instance, isLoading, error };
};
