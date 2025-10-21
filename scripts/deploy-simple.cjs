const hre = require('hardhat');
const { ethers } = hre;
const fs = require('fs');

async function main() {
  console.log('Deploying SecretBidSanctuarySimple...');
  
  // Initialize FHE
  if (hre.fhevm && hre.fhevm.initializeCLIApi) {
    await hre.fhevm.initializeCLIApi();
    console.log('FHE initialized');
  }

  const SecretBidSanctuarySimple = await ethers.getContractFactory('SecretBidSanctuarySimple');
  const contract = await SecretBidSanctuarySimple.deploy();
  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  console.log('SecretBidSanctuarySimple deployed to:', contractAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: hre.network.name,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync('deployment-info-simple.json', JSON.stringify(deploymentInfo, null, 2));
  console.log('Deployment info saved to deployment-info-simple.json');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Deployment failed:', error);
    process.exit(1);
  });
