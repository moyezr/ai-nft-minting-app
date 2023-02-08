
const hre = require("hardhat");

async function main() {
  //Whitelist Contract Factory
  const whitelistContract = await ethers.getContractFactory("Whitelist");
  const deployedWhitelistContract = await whitelistContract.deploy(100);
  await deployedWhitelistContract.deployed();

  //Deploying the AiMintsCollection 
  const aiMintsContract = await ethers.getContractFactory("AiMints");
  const deployedAiMintsContract = await aiMintsContract.deploy(deployedWhitelistContract.address);

  await deployedAiMintsContract.deployed()


  console.log(`
  Whitelist Contract Deployed to ${deployedWhitelistContract.address}
  AiMints Contract Deployed to ${deployedAiMintsContract.address}
  `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => {
  process.exit(0)
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
