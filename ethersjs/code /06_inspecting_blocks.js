const { ethers } = require("ethers");

const ALCHEMY_ID = "EwjszCTfzrln_WX3iqJ7IRQUYDBT1nMa";
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`
);
const main = async () => {
  const block = await provider.getBlockNumber();
  console.log(`\nBlock number: ${block}`);

  const blockInfo = await provider.getBlock(block);
  console.log(blockInfo);

  const { transactions } = await provider.getBlockWithTransactions(block);
  console.log(transactions[0]);
};

main();
