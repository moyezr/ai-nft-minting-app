
const hre = require("hardhat");

async function main() {
  //Whitelist Contract Factory
  const whitelistContract = await ethers.getContractFactory("Whitelist");
  const deployedWhitelistContract = await whitelistContract.deploy(100);
  await deployedWhitelistContract.deployed();

  //Deploying the DeDevsCollection 
  const deDevsContract = await ethers.getContractFactory("DeDevs");
  const deployedDeDevsContract = await deDevsContract.deploy(deployedWhitelistContract.address);

  await deployedDeDevsContract.deployed()


  console.log(`
  Whitelist Contract Deployed to ${deployedWhitelistContract.address}
  DeDevs Contract Deployed to ${deployedDeDevsContract.address}
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
