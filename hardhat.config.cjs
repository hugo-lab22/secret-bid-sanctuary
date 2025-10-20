require("@nomicfoundation/hardhat-toolbox");
require("@fhevm/hardhat-plugin");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true  // Required for FHE to avoid "Stack too deep" errors
    },
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};


const { task } = require('hardhat/config');

task('init:auctions', "Create 3 auctions with FHE-encrypted reserve prices")
  .setAction(async (_args, hre) => {
    const fs = require('fs');
    const deployment = JSON.parse(fs.readFileSync('deployment-info.json','utf8'));
    const CONTRACT_ADDRESS = deployment.contractAddress;

    if (hre.fhevm && hre.fhevm.initializeCLIApi) {
      await hre.fhevm.initializeCLIApi();
    } else {
      throw new Error('hre.fhevm is not available');
    }

    const [signer] = await hre.ethers.getSigners();
    const contract = await hre.ethers.getContractAt('SecretBidSanctuary', CONTRACT_ADDRESS, signer);

    async function encryptReserve(priceCents) {
      return hre.fhevm
        .createEncryptedInput(CONTRACT_ADDRESS, signer.address)
        .add32(priceCents)
        .encrypt();
    }

    const props = [
      { name: 'Modern Luxury Villa', desc: 'Beverly Hills, CA', img: 'ipfs://villa', reserveUsd: 2850000, duration: 3*24*3600 },
      { name: 'Downtown Penthouse', desc: 'Manhattan, NY', img: 'ipfs://pent', reserveUsd: 4200000, duration: 2*24*3600 },
      { name: 'Waterfront Estate', desc: 'Malibu, CA', img: 'ipfs://water', reserveUsd: 6750000, duration: 5*24*3600 },
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
  });
