import { useReadContract, useWriteContract } from 'wagmi';
import contractABI from '@/lib/contractABI.json';

// Contract configuration (v2: pass address/abi per call)
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x9b7BaD82c80fC119C6b8894BE7B060Ad4745c80d';

export const usePropertyInfo = (propertyId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'getPropertyInfo',
    args: [propertyId],
  });
};

export const usePropertyEncryptedData = (propertyId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'getPropertyEncryptedData',
    args: [propertyId],
  });
};

export const useBidEncryptedData = (bidId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'getBidEncryptedData',
    args: [bidId],
  });
};

export const usePlaceBid = () => {
  // v2: returns writeContract fn; provide address/abi at call site
  return useWriteContract();
};

