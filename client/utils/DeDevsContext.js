import { useEffect, useContext, useState } from "react";
import { DeDevsContractAbi, DeDevsContractAddress, WhitelistContractAbi, WhitelistContractAddress } from "./constants";
import { ethers } from "ethers";
import React from 'react'

const DeDevsContext = React.createContext();

const DeDevsProvider = ({children}) => {
const [currentAddress, setCurrentAddress] = useState("")
  const [walletConnected, setWalletConnected] = useState(false);
  const [totalWhitelisted, setTotalWhitelisted] = useState(0);
  const [nftsMinted, setNftsMinted] = useState(0);


  const getProviderOrSigner = async (needSigner = false) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const chainId = await provider.send("eth_chainId", []);
    console.log(chainId);
    // if (chainId != "0x7a69") {
    //   window.alert("Please connect to the localhost");
    //   throw new Error("Please Switch to the localhost");
    // }

    if (needSigner) {
      const signer = provider.getSigner();
      return signer;
    }
    return provider;
  };


  const connectWallet = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletConnected(true);
      setCurrentAddress(accounts[0])
    } catch (error) {
      console.log("Error COnnecting to the wallet", error)
    }
  }

  const getContractInstance = async (contractAddress, contractAbi, providerOrSigner) => {
    const instance =  new ethers.Contract(
      contractAddress,
      contractAbi,
      providerOrSigner
    );
    return instance
  }

  const getWhitelisted = async () => {
    try {
      const signer = await getProviderOrSigner(true);


      console.log("Whitelist contract address --> ", WhitelistContractAddress);

      const whitelistContract = await getContractInstance(WhitelistContractAddress, WhitelistContractAbi, signer);
      
      console.log("WHite list Contract ",whitelistContract )

      const txn = await whitelistContract.addAddressToWhitelist();
      await txn.wait();

      await getTotalWhitelisted();


      console.log("Number of Addresses whitelisted -->", totalWhitelisted);
    } catch (error) {
      // console.log("error msg", error.data.message)
      if(error.data){
        if(error.data.message == "Error: VM Exception while processing transaction: reverted with reason string 'Sender has already been whitelisted'")
        alert("You are already Whitelisted");
      }
      console.log("Error Whitelisting the Address", error);
    }
  }

  const getTotalWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const whitelistContract = await getContractInstance(WhitelistContractAddress, WhitelistContractAbi, provider);
      const noWhitelisted = await whitelistContract.numAddressesWhitelisted();

      setTotalWhitelisted(noWhitelisted);

    } catch (error) {
      console.log("Error fetching the number of whitelisted addresses", error)
    }
  }

  const checkIfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const whitelistContract = await getContractInstance(WhitelistContractAddress, WhitelistContractAbi, provider)


      console.log("WHitelist Contract", whitelistContract)
      const txn = await whitelistContract.isWhitelisted(currentAddress);

      console.log("txn -->", txn)

      return txn;
    } catch (error) {
      console.log("Error checking for Whitelist", error )
    }
  }

  const mintNFT = async (tokenURI, isWhitelisted) => {
    try {
      const signer = await getProviderOrSigner(true);
      const deDevsContract = await getContractInstance(DeDevsContractAddress, DeDevsContractAbi, signer);
      
      await checkIfWhitelisted();

      if(isWhitelisted) {
        const txn = await deDevsContract.whitelistMint(tokenURI, {value: ethers.utils.parseUnits("0.2", "ether")});
        await txn.wait();
        alert("Successfully Minted the NFT")
      } else {
        if(isWhitelisted) {
          const txn = await deDevsContract.publicMint(tokenURI, {value: ethers.utils.parseUnits("0.1", "ether")});
          await txn.wait();
        alert("Successfully Minted the NFT")

        }
      }
    } catch (error) {
      alert("Failed to Mint NFT");
      console.log("Error Minting NFT", error);
    }
  }

  const fetchTokenURI = async (tokenId) => {
    try {
      const provider = await getProviderOrSigner(false);
      const deDevsContract = await getContractInstance(DeDevsContractAddress, DeDevsContractAbi, provider);

      const tokenURI = await deDevsContract.tokenURI(tokenId);

      return tokenURI;
    } catch (error) {
      console.log("error fetching token URI", error);
    }
  }

  const numberOfNFTsMinted = async() => {
    try {
      const provider = await getProviderOrSigner(false);
      const deDevsContract = await getContractInstance(DeDevsContractAddress, DeDevsContractAbi, provider);
      
      const no = await deDevsContract.getNumberOfNFTsMinted();

      console.log("number of NFTs minted --> ", no);
      setNftsMinted(no);
    } catch (error) {
      console.log("Error fetching the number of NFTs Minted", error);
    }
  }
 
  return (
    <DeDevsContext.Provider value={
       {
        totalWhitelisted,
        connectWallet,
        currentAddress,
        walletConnected,
        getWhitelisted,
        getTotalWhitelisted,
        checkIfWhitelisted,
        mintNFT,
        numberOfNFTsMinted,
        nftsMinted
       }
    }>{children}</DeDevsContext.Provider>
  )
}

export const useDeDevsContext = () => {
    return useContext(DeDevsContext)
}

export default DeDevsProvider