require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://goerli.infura.io/v3/8d59bc89354d49098e71aa0cc638eaa7",
      accounts: ["c406daaef30bce82152be931e617df104b59db9f23a612eeb48ff5c4fa422c40"]
    }
}
};
