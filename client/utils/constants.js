import aiMints from "./AiMints.json";
import whitelist from "./Whitelist.json";
const AiMintsContractAddress = "0xA98b8f1815EB30F186831F27a1Fcd412BDb7Ba44";
const WhitelistContractAddress = "0x3B7Ee0bA28D19be10D728E7Cb475B1FbAA2a25bb";
const AiMintsContractAbi = aiMints.abi;
const WhitelistContractAbi =  whitelist.abi;

export { AiMintsContractAbi, AiMintsContractAddress, WhitelistContractAbi, WhitelistContractAddress  }