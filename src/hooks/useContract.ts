import { useReadContract, useWriteContract } from 'wagmi';
import contractABI from '@/lib/contractABI.json';

// Contract configuration (v2: pass address/abi per call)
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x7F6dfA7EacC6E696A93756fB7f8f78b1C7cfC80a';

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

