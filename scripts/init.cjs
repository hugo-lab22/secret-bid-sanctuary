const hre = require('hardhat');
const { ethers } = hre;
const fs = require('fs');

async function main() {
  const deployment = JSON.parse(fs.readFileSync('deployment-info.json','utf8'));
  const CONTRACT_ADDRESS = deployment.contractAddress;

  // FHE CLI init (best-effort)
  let fhevm;
  try {
    ({ fhevm } = require('@fhevm/hardhat-plugin'));
    if (fhevm && fhevm.initializeCLIApi) {
      await fhevm.initializeCLIApi();
    }
  } catch (_) {}

  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt('SecretBidSanctuary', CONTRACT_ADDRESS, signer);

  // Helper to encrypt reservePrice (uint32 cents) via hre.fhevm
  async function encryptReserve(priceCents) {
    return hre.fhevm
      .createEncryptedInput(CONTRACT_ADDRESS, signer.address)
      .add32(priceCents)
      .encrypt();
  }

  // 3 properties to create
  const props = [
    { name: 'Modern Luxury Villa', desc: 'Beverly Hills, CA', img: 'src/assets/property-1.jpg', reserveUsd: 2850000, duration: 3*24*3600 },
    { name: 'Downtown Penthouse', desc: 'Manhattan, NY', img: 'src/assets/property-2.jpg', reserveUsd: 4200000, duration: 2*24*3600 },
    { name: 'Waterfront Estate', desc: 'Malibu, CA', img: 'src/assets/property-3.jpg', reserveUsd: 6750000, duration: 5*24*3600 },
  ];

  for (const p of props) {
    const cents = Math.floor(p.reserveUsd * 100);
    const enc = await encryptReserve(cents);
    const handle = enc.handles[0];
    const inputProof = enc.inputProof;

    const tx = await contract.listProperty(
      p.name,
      p.desc,
      p.img,
      handle,
      p.duration,
      inputProof
    );
    console.log('listProperty tx:', tx.hash);
    await tx.wait();
  }

  console.log('Initialized 3 properties with encrypted reserve prices.');
}

main().catch((e)=>{ console.error(e); process.exit(1);});
