const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  console.log('Testing FHE with detailed permission setup...');
  
  // Initialize FHE
  if (hre.fhevm && hre.fhevm.initializeCLIApi) {
    await hre.fhevm.initializeCLIApi();
    console.log('FHE initialized');
  }

  // Use private key from environment variable
  let signer;
  if (process.env.TEST_PRIVATE_KEY) {
    signer = new ethers.Wallet(process.env.TEST_PRIVATE_KEY, hre.ethers.provider);
    console.log('Using test private key, address:', signer.address);
  } else {
    [signer] = await ethers.getSigners();
    console.log('Using default signer, address:', signer.address);
  }
  
  const deployment = JSON.parse(require('fs').readFileSync('deployment-info.json','utf8'));
  const CONTRACT_ADDRESS = deployment.contractAddress;

  try {
    console.log('Creating encrypted input...');
    const input = hre.fhevm.createEncryptedInput(CONTRACT_ADDRESS, signer.address);
    input.add32(1000000); // 1 million cents = $10,000
    const encrypted = await input.encrypt();
    
    console.log('Encrypted handles:', encrypted.handles);
    console.log('Input proof length:', encrypted.inputProof.length);
    
    // Note: Permissions are set inside the contract using FHE.allow()
    // No need to set permissions externally like in relayer SDK
    console.log('Using contract-internal permission setting...');
    
    // Test contract call
    console.log('Calling contract...');
    const contract = await ethers.getContractAt('SecretBidSanctuary', CONTRACT_ADDRESS, signer);
    
    const tx = await contract.placeBid(
      0, // property ID
      encrypted.handles[0],
      encrypted.inputProof
    );
    
    console.log('Transaction hash:', tx.hash);
    await tx.wait();
    console.log('✅ Test bid placed successfully');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });
