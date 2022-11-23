const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`);

const account1 = "0xd34c0577603592Be09695F3801537287e78bffb0";
const account2 = "0xC60AC703223D514FD7033531Faa4B5bb286CB958";
const privateKey1 =
  "0x2e7a5eeb8bc2726c8648e858d0518de7d29059fd5f5198fde5a5863d7d8cdb14";

const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
  // Balances de las cuentas antes de la tx
  const senderBalanceBefore = await provider.getBalance(account1);
  console.log(
    `senderBalanceBefore: ${ethers.utils.formatEther(senderBalanceBefore)} ETH`
  );

  const recieverBalanceBefore = await provider.getBalance(account2);
  console.log(
    `recieverBalanceBefore: ${ethers.utils.formatEther(
      recieverBalanceBefore
    )} ETH`
  );

  // Haciendo la tx
  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("100"),
  });

  await tx.wait();
  console.log(tx);

  // Balances de las cuentas despues de la tx
  const senderBalanceAfter = await provider.getBalance(account1);
  console.log(
    `senderBalanceAfter: ${ethers.utils.formatEther(senderBalanceAfter)} ETH`
  );
  const recieverBalanceAfter = await provider.getBalance(account2);
  console.log(
    `recieverBalanceAfter: ${ethers.utils.formatEther(
      recieverBalanceAfter
    )} ETH`
  );
};

main();
