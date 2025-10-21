const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Testing contract query functions...");
  
  // Get the contract
  const contractAddress = "0x7F6dfA7EacC6E696A93756fB7f8f78b1C7cfC80a";
  const SecretBidSanctuary = await ethers.getContractFactory("SecretBidSanctuary");
  const contract = SecretBidSanctuary.attach(contractAddress);
  
  console.log("📋 Contract address:", contractAddress);
  
  try {
    // Test 1: Get property counter
    console.log("\n1️⃣ Testing propertyCounter...");
    const propertyCounter = await contract.propertyCounter();
    console.log("   ✅ propertyCounter:", propertyCounter.toString());
    
    // Test 2: Get property info for each property
    const totalProperties = Number(propertyCounter);
    console.log(`\n2️⃣ Testing getPropertyInfo for ${totalProperties} properties...`);
    
    for (let i = 0; i < totalProperties; i++) {
      console.log(`\n📊 Property ${i}:`);
      try {
        const info = await contract.getPropertyInfo(i);
        console.log(`   Name: ${info[0]}`);
        console.log(`   Description: ${info[1]}`);
        console.log(`   Image Hash: ${info[2]}`);
        console.log(`   Reserve Price: $${Number(info[3]) / 100}`); // Convert from cents
        console.log(`   Current Bid: $${Number(info[4]) / 100}`); // Convert from cents
        console.log(`   Bid Count: ${info[5]}`);
        console.log(`   Is Active: ${info[6]}`);
        console.log(`   Is Verified: ${info[7]}`);
        console.log(`   Owner: ${info[8]}`);
        console.log(`   Highest Bidder: ${info[9]}`);
        console.log(`   Start Time: ${new Date(Number(info[10]) * 1000).toLocaleString()}`);
        console.log(`   End Time: ${new Date(Number(info[11]) * 1000).toLocaleString()}`);
        
        // Test 3: Get encrypted data
        console.log(`\n🔐 Testing getPropertyEncryptedData for property ${i}...`);
        try {
          const encryptedData = await contract.getPropertyEncryptedData(i);
          console.log(`   ✅ Encrypted data: ${encryptedData}`);
        } catch (error) {
          console.log(`   ❌ Encrypted data error: ${error.message}`);
        }
        
      } catch (error) {
        console.log(`   ❌ Error reading property ${i}: ${error.message}`);
      }
    }
    
    // Test 4: Test with invalid property ID
    console.log(`\n3️⃣ Testing with invalid property ID...`);
    try {
      const invalidInfo = await contract.getPropertyInfo(999);
      console.log("   ❌ Should have failed but didn't");
    } catch (error) {
      console.log(`   ✅ Correctly failed for invalid ID: ${error.message}`);
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Full error:", error);
  }
  
  console.log("\n✅ Contract query test completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
