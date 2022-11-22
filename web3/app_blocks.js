const Web3 = require('web3')
const web3 = new Web3(
    'https://eth-mainnet.g.alchemy.com/v2/EwjszCTfzrln_WX3iqJ7IRQUYDBT1nMa'
)
// Nos permite obtener informacion del ultimo bloque
web3.eth.getBlock('latest').then((block) => {
    console.log(block)
})

// Nos permite obtener informacion de un numero de bloque
web3.eth.getBlock('14835968').then((block) => {
    console.log({
        blockHash: block.hash,
        blockNumber: block.number,
        nonce: block.nonce,
    })
})

/* 
    Nos permite obtener informacion de los bloques que deseemos, en este caso de
    los 10 ultimos bloques 

*/
web3.eth.getBlockNumber().then((latest) => {
    for (let i = 0; i < 10; i++) {
        web3.eth.getBlock(latest - i).then((block) => {
            console.log({
                blockHash: block.hash,
                blockNumber: block.number,
                nonce: block.nonce,
            })
        })
    }
})

// Nos permite obtener informacion del ultimo bloque
web3.eth.getBlock('latest').then(console.log)
