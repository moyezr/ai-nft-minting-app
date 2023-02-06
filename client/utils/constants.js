import aiMints from "./AiMints.json";
import whitelist from "./Whitelist.json";
const AiMintsContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const WhitelistContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const AiMintsContractAbi = aiMints.abi;
const WhitelistContractAbi =  whitelist.abi;

export { AiMintsContractAbi, AiMintsContractAddress, WhitelistContractAbi, WhitelistContractAddress  }