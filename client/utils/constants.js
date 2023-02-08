import aiMints from "./AiMints.json";
import whitelist from "./Whitelist.json";
const AiMintsContractAddress = "0x744656fbCa6EfEBC042dD080a7AC3660c0fDCEBb";
const WhitelistContractAddress = "0x5BFbE5c656532D9c28B742fEa0c169aAEd4205A2";
const AiMintsContractAbi = aiMints.abi;
const WhitelistContractAbi =  whitelist.abi;

export { AiMintsContractAbi, AiMintsContractAddress, WhitelistContractAbi, WhitelistContractAddress  }