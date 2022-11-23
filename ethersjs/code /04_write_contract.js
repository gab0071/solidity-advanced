const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`);

const account1 = "0xd34c0577603592Be09695F3801537287e78bffb0";
const account2 = "0xC60AC703223D514FD7033531Faa4B5bb286CB958";
const privateKey1 =
  "0x2e7a5eeb8bc2726c8648e858d0518de7d29059fd5f5198fde5a5863d7d8cdb14";

const wallet = new ethers.Wallet(privateKey1, provider);

// Utilizamos el smart contract que hemos creado previamente (customToken)
const ERC20_ABI = [
  "function decimals() view returns (uint)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

// direccion del Smart Contract 
const address = "0x8644CC38cF772d3C14bb7c5d71d56020bac23250";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const decimals = await contract.decimals();
  console.log(`Decimals: ${decimals}`);
  
  //   Balance antes de la transaccion (cuenta uno) 
  const balanceBefore = await contract.balanceOf(account1);
  console.log(
    `BalanceBefore (${account1}): ${balanceBefore / 10 ** decimals} Tokens`
  );

//   connectandonos con la wallet y haciendo la transaccion 
  const contractWithWallet = contract.connect(wallet);
  const tx = await contractWithWallet.transfer(account2, balanceBefore);
  await tx.wait();
  console.log(tx);

//   Balance despues de la transaccion 
  const balanceAfter = await contract.balanceOf(account1);
  console.log(
    `balanceAfter (${account1}): ${balanceAfter / 10 ** decimals} Tokens`
  );
  const balanceAccount2 = await contract.balanceOf(account2);
  console.log(
    `balanceAccount2 (${account2}): ${balanceAccount2 / 10 ** decimals} Tokens`
  );
};

main();
