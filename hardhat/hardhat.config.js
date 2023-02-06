require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    // hardhat: {
    //   chainId: 31337
    // },
    goerli: {
      url: process.env.REACT_APP_ALCHEMY_API_URL,
      accounts: [ process.env.REACT_APP_PRIVATE_KEY ]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};