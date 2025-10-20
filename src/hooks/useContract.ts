import { useContract, useContractRead, useContractWrite } from 'wagmi';
import contractABI from '@/lib/contractABI.json';

// Contract configuration
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0xB979D2a4D8795BffB02e987D45AaC9F562c070Be';

export const useSecretBidContract = () => {
  return useContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
  });
};

export const usePropertyInfo = (propertyId: number) => {
  return useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'getPropertyInfo',
    args: [propertyId],
  });
};

export const usePropertyEncryptedData = (propertyId: number) => {
  return useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'getPropertyEncryptedData',
    args: [propertyId],
  });
};

export const useBidEncryptedData = (bidId: number) => {
  return useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'getBidEncryptedData',
    args: [bidId],
  });
};

export const usePlaceBid = () => {
  return useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'placeBid',
  });
};

export const useListProperty = () => {
  return useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'listProperty',
  });
};

export const useEndAuction = () => {
  return useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'endAuction',
  });
};
