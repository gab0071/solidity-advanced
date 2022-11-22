const Web3 = require('web3')
const web3 = new Web3(
    'https://eth-mainnet.g.alchemy.com/v2/EwjszCTfzrln_WX3iqJ7IRQUYDBT1nMa'
)

/* Recursos:
    This package provides utility functions for Ethereum dapps and other web3.js packages.
    
    - Link -> https://web3js.readthedocs.io/en/v1.8.1/web3-utils.html?highlight=utils#web3-utils
    
*/

// Haciendo una pequeña prueba para trabajar con los utils de web3.js
// -------------------------------------------------------------------------------------
console.log(
    '\n --------- ✨ Todo esto referente al hashing ✨--------------------'
)
console.log('\n SHA3: ', web3.utils.sha3('Hi, catella'))
console.log('Keccak256: ', web3.utils.keccak256('Hi, catella'))
console.log('Solidity SHA3 (1 input): ', web3.utils.soliditySha3('Hi, catella'))
console.log(
    'Solidity SHA3 (2 inputs): ',
    web3.utils.soliditySha3('Hi, catella', 'Hi, tech')
)
console.log(
    'Type & Value (1): ',
    web3.utils.soliditySha3(
        { type: 'string', value: 'Hi, catella' },
        { type: 'string', value: 'Hi, tech' }
    )
)
console.log(
    'Type & Value (2): ',
    web3.utils.soliditySha3(
        { type: 'string', value: 'Hi, catella' },
        { type: 'string', value: 'Hi, tech' },
        { type: 'uint16', value: 0x3031 }
    )
)
// -------------------------------------------------------------------------------------
console.log('\n --------- ✨ Todo esto referente al hex ✨--------------------')
console.log('\nrandomHex(0): ', web3.utils.randomHex(0))
console.log('randomHex(1): ', web3.utils.randomHex(1))
console.log('randomHex(12): ', web3.utils.randomHex(12))
console.log("isHex('0xc1912'): ", web3.utils.isHex('0xc1912'))
console.log("isHex('Hi, catella'): ", web3.utils.isHex('Hi, catella'))
console.log(
    "isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d'): ",
    web3.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
)
console.log(
    "isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'): ",
    web3.utils.isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
)
console.log("hexToNumber('0x1bc'): ", web3.utils.hexToNumber('0x1bc'))
console.log('numberToHex(444): ', web3.utils.numberToHex(444))
console.log(
    "hexToUtf8('0x49206861766520343434207472696c6c'): ",
    web3.utils.hexToUtf8('0x49206861766520343434207472696c6c')
)
console.log(
    "utf8ToHex('I have 444 trill'): ",
    web3.utils.utf8ToHex('I have 444 trill')
)
