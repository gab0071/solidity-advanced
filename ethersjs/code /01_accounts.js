const { ethers } = require("ethers");

const ALCHEMY_ID = "EwjszCTfzrln_WX3iqJ7IRQUYDBT1nMa";
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`
);

const address = "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5";

const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(
    `\nETH Balance (${address}) --> ${ethers.utils.formatEther(balance)} ETH\n`
  );
};

main();
