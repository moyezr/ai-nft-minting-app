import aiMints from "./AiMints.json";
import whitelist from "./Whitelist.json";
const AiMintsContractAddress = "0x2c466ba7b3f6fe3340f83a5C5500769F836D5976";
const WhitelistContractAddress = "0x9A99a9dD8Ace331B0621c29621892E1C716f70A1";
const AiMintsContractAbi = aiMints.abi;
const WhitelistContractAbi =  whitelist.abi;

export { AiMintsContractAbi, AiMintsContractAddress, WhitelistContractAbi, WhitelistContractAddress  }