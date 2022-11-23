const { ethers } = require("ethers");

const ALCHEMY_ID = "EwjszCTfzrln_WX3iqJ7IRQUYDBT1nMa";
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`
);

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  console.log(`\nReading from: ${address}\n`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}\n`);

  const balance = await contract.balanceOf(
    "0x0dbf69954b3416de2c2c5dc3ccc40d28a30c2188"
  );
  console.log(`Balance Returned: ${balance}`);
  console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`);
};

main();
