const hre = require('hardhat');
const { ethers } = hre;
const fs = require('fs');

async function main() {
  const deployment = JSON.parse(fs.readFileSync('deployment-info.json','utf8'));
  const CONTRACT_ADDRESS = deployment.contractAddress;

  console.log('Initializing auction assets...');
  console.log('Contract address:', CONTRACT_ADDRESS);

  const [signer] = await ethers.getSigners();
  console.log('Using signer:', signer.address);

  const contract = await ethers.getContractAt('SecretBidSanctuary', CONTRACT_ADDRESS, signer);

  // Properties to initialize
  const props = [
    { name: 'Modern Luxury Villa', desc: 'Beverly Hills, CA', img: 'ipfs://villa', reserveUsd: 2850000, duration: 3*24*3600 },
    { name: 'Downtown Penthouse', desc: 'Manhattan, NY', img: 'ipfs://pent', reserveUsd: 4200000, duration: 2*24*3600 },
    { name: 'Waterfront Estate', desc: 'Malibu, CA', img: 'ipfs://water', reserveUsd: 6750000, duration: 5*24*3600 },
  ];

  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    console.log(`\nInitializing property ${i + 1}: ${prop.name}`);
    
    try {
      // For now, we'll use dummy encrypted data since FHE is not working in CLI
      // In a real scenario, this would be properly encrypted
      const dummyEncryptedPrice = '0x' + '0'.repeat(64); // 32 bytes of zeros
      const dummyProof = '0x' + '0'.repeat(128); // 64 bytes of zeros
      
      const tx = await contract.listProperty(
        prop.name,
        prop.desc,
        prop.img,
        dummyEncryptedPrice,
        prop.duration,
        dummyProof
      );
      
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log(`✅ Property ${i + 1} initialized successfully`);
      
    } catch (error) {
      console.error(`❌ Failed to initialize property ${i + 1}:`, error.message);
    }
  }

  console.log('\n🎉 Auction initialization completed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Initialization failed:', error);
    process.exit(1);
  });
