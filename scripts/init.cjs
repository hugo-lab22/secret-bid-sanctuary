const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Initializing new contract with public reservePrice and bidCount...");
  
  // Get the contract
  const contractAddress = "0x7F6dfA7EacC6E696A93756fB7f8f78b1C7cfC80a";
  const SecretBidSanctuary = await ethers.getContractFactory("SecretBidSanctuary");
  const contract = SecretBidSanctuary.attach(contractAddress);
  
  console.log("📋 Contract address:", contractAddress);
  
  // Create some test properties with public reserve prices
  const properties = [
    {
      name: "Modern Luxury Villa",
      description: "Beverly Hills, CA",
      imageHash: "/property-1.jpg",
      reservePrice: 100000, // $100,000 in cents
      duration: 259200 // 3 days in seconds
    },
    {
      name: "Downtown Penthouse", 
      description: "Manhattan, NY",
      imageHash: "/property-2.jpg",
      reservePrice: 150000, // $150,000 in cents
      duration: 172800 // 2 days in seconds
    },
    {
      name: "Waterfront Estate",
      description: "Malibu, CA", 
      imageHash: "/property-3.jpg",
      reservePrice: 200000, // $200,000 in cents
      duration: 432000 // 5 days in seconds
    }
  ];
  
  console.log("🏠 Creating test properties...");
  
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    console.log(`\n📝 Creating property ${i + 1}: ${prop.name}`);
    
    try {
      const tx = await contract.listProperty(
        prop.name,
        prop.description, 
        prop.imageHash,
        prop.reservePrice,
        prop.duration
      );
      
      console.log(`   ✅ Transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log(`   ✅ Property ${i + 1} created successfully`);
      
    } catch (error) {
      console.error(`   ❌ Error creating property ${i + 1}:`, error.message);
    }
  }
  
  // Verify properties were created
  console.log("\n🔍 Verifying properties...");
  
  for (let i = 0; i < properties.length; i++) {
    try {
      const info = await contract.getPropertyInfo(i);
      console.log(`\n📊 Property ${i} info:`);
      console.log(`   Name: ${info[0]}`);
      console.log(`   Description: ${info[1]}`);
      console.log(`   Reserve Price: $${Number(info[3]) / 100}`); // Convert from cents
      console.log(`   Bid Count: ${info[5]}`);
      console.log(`   Is Active: ${info[6]}`);
      console.log(`   End Time: ${new Date(Number(info[11]) * 1000).toLocaleString()}`);
      
    } catch (error) {
      console.error(`   ❌ Error reading property ${i}:`, error.message);
    }
  }
  
  console.log("\n✅ Contract initialization completed!");
  console.log("🎯 Now reservePrice and bidCount are public and should display correctly in the frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
