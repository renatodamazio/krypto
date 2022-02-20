// https://eth-ropsten.alchemyapi.io/v2/P2cH8SDgoKrBPKZ9yZqDC5KfBsC9MPE-
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/P2cH8SDgoKrBPKZ9yZqDC5KfBsC9MPE-",
      accounts: [
        "24d6fb6bcbb56269887c223f3304c44e3d063cdd3b44d02bc5af15826c007b8d",
      ],
    },
  },
};
