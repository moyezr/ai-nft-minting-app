import deDevs from "./DeDevs.json";
import whitelist from "./Whitelist.json";
const DeDevsContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const WhitelistContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const DeDevsContractAbi = deDevs.abi;
const WhitelistContractAbi =  whitelist.abi;

export { DeDevsContractAbi, DeDevsContractAddress, WhitelistContractAbi, WhitelistContractAddress  }