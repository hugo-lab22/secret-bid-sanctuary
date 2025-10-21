const { ethers } = require("hardhat");

async function main() {
  console.log("🧪 Testing simple contract interaction...");
  
  // Get the contract
  const contractAddress = "0x1ac25Ba819b319ac3108bb75ced6792376D84F69";
  const SecretBidSanctuary = await ethers.getContractFactory("SecretBidSanctuary");
  const contract = SecretBidSanctuary.attach(contractAddress);
  
  console.log("📋 Contract address:", contractAddress);
  
  // Test basic contract interaction
  try {
    console.log("🔍 Testing propertyCounter...");
    const counter = await contract.propertyCounter();
    console.log("   ✅ Property counter:", counter.toString());
    
    console.log("🔍 Testing getPropertyInfo for property 0...");
    const info = await contract.getPropertyInfo(0);
    console.log("   ✅ Property 0 info:", info);
    
  } catch (error) {
    console.error("   ❌ Error:", error.message);
  }
  
  // Try to create a simple property
  try {
    console.log("\n🏠 Creating a simple property...");
    const tx = await contract.listProperty(
      "Test Property",
      "Test Description", 
      "test-image.jpg",
      100000, // $1000 in cents
      86400   // 1 day in seconds
    );
    
    console.log("   ✅ Transaction hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("   ✅ Transaction confirmed in block:", receipt.blockNumber);
    
    // Check the property
    const newInfo = await contract.getPropertyInfo(0);
    console.log("   ✅ New property info:", newInfo);
    
  } catch (error) {
    console.error("   ❌ Error creating property:", error.message);
    console.error("   ❌ Error details:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
