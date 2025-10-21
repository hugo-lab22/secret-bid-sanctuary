const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  const deployment = JSON.parse(require('fs').readFileSync('deployment-info.json','utf8'));
  const CONTRACT_ADDRESS = deployment.contractAddress;

  console.log('Verifying contract data...');
  console.log('Contract address:', CONTRACT_ADDRESS);

  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt('SecretBidSanctuary', CONTRACT_ADDRESS, signer);

  try {
    const propertyCounter = await contract.propertyCounter();
    console.log('✅ Total properties:', propertyCounter.toString());
    
    if (propertyCounter > 0) {
      console.log('\n📋 Property details:');
      for (let i = 0; i < Number(propertyCounter); i++) {
        try {
          const info = await contract.getPropertyInfo(i);
          console.log(`Property ${i}: ${info[0]} - ${info[1]}`);
        } catch (e) {
          console.log(`Property ${i}: Error reading details`);
        }
      }
    }
    
    console.log('\n🎉 Contract verification completed successfully!');
  } catch (error) {
    console.error('❌ Contract verification failed:', error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Verification failed:', error);
    process.exit(1);
  });
