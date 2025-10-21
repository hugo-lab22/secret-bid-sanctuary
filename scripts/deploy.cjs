// Deployment script for Secret Bid Sanctuary contract
// This script deploys the contract to Sepolia testnet with FHE support

const { ethers } = require("hardhat");

async function main() {
  console.log("Starting Secret Bid Sanctuary contract deployment...");

  // Initialize FHE support
  const { fhevm } = require("@fhevm/hardhat-plugin");
  if (fhevm && fhevm.initializeCLIApi) {
    await fhevm.initializeCLIApi();
  }

  // Get the contract factory and deployer
  const SecretBidSanctuary = await ethers.getContractFactory("SecretBidSanctuary");
  const [deployer] = await ethers.getSigners();
  
  // Deploy the contract
  // Note: You'll need to provide a verifier address
  const verifierAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  
  console.log("Deploying contract with FHE support...");
  const secretBidSanctuary = await SecretBidSanctuary.deploy(verifierAddress);
  
  await secretBidSanctuary.waitForDeployment();
  
  const contractAddress = await secretBidSanctuary.getAddress();
  
  console.log("✅ Secret Bid Sanctuary deployed to:", contractAddress);
  console.log("📋 Contract details:");
  console.log("   - Network: Sepolia Testnet");
  console.log("   - Verifier: ", verifierAddress);
  console.log("   - Deployer: ", deployer.address);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: "sepolia",
    verifier: verifierAddress,
    owner: await secretBidSanctuary.owner(),
    deploymentTime: new Date().toISOString(),
    transactionHash: secretBidSanctuary.deploymentTransaction().hash
  };
  
  const fs = require('fs');
  fs.writeFileSync(
    'deployment-info.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("💾 Deployment info saved to deployment-info.json");
  console.log("🔗 View on Etherscan: https://sepolia.etherscan.io/address/" + contractAddress);
  
  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
