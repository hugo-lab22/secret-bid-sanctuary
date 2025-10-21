const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  const deployment = JSON.parse(require('fs').readFileSync('deployment-info.json','utf8'));
  const CONTRACT_ADDRESS = deployment.contractAddress;

  console.log('Initializing auction assets...');
  console.log('Contract address:', CONTRACT_ADDRESS);

  const [signer] = await ethers.getSigners();
  console.log('Using signer:', signer.address);

  const contract = await ethers.getContractAt('SecretBidSanctuary', CONTRACT_ADDRESS, signer);

  // Check if contract is accessible
  try {
    const propertyCounter = await contract.propertyCounter();
    console.log('Current property counter:', propertyCounter.toString());
  } catch (error) {
    console.error('Failed to access contract:', error.message);
    return;
  }

  console.log('✅ Contract is accessible and ready for initialization');
  console.log('Note: FHE initialization requires proper encrypted data from frontend');
  console.log('The contract is deployed and ready to receive encrypted bids from the frontend');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Initialization check failed:', error);
    process.exit(1);
  });
