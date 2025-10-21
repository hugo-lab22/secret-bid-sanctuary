import { useReadContract, useWriteContract } from 'wagmi';
import contractABI from '@/lib/contractABI.json';

// Contract configuration (v2: pass address/abi per call)
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0xe737695242bC565408F1258B764A1c21a1BcE19f';

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

