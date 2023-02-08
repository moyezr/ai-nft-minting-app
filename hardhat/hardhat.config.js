require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { REACT_APP_ALCHEMY_API_URL, PRIVATE_KEY } = process.env;


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    // goerli: {
    //   url: `${REACT_APP_ALCHEMY_API_URL}`,
    //   accounts: [ `${PRIVATE_KEY}` ]
    // }
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