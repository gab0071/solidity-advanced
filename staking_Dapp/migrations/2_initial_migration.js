const TechToken = artifacts.require('TechToken');
const CatellaToken = artifacts.require('CatellaToken');
const TokenFarm = artifacts.require('TokenFarm');

module.exports = async function (deployer, accounts) {
    // Despliegue del TechToken
    await deployer.deploy(TechToken);
    const techToken = await TechToken.deployed();

    // Despliegue del CatellaToken
    await deployer.deploy(CatellaToken);
    const catellaToken = await CatellaToken.deployed();

    // Despliegue del TokenFarm
    await deployer.deploy(TokenFarm, catellaToken.address, techToken.address);
    const tokenFarm = await TokenFarm.deployed();

    // Transferir tokens CatellaToken (token de recompensa) a TokenFarm (1 millon de tokens)
    await catellaToken.transfer(tokenFarm.address, '1000000000000000000000000');

    // Transferencia de los tokens para el Staking
     await techToken.transfer('0xA0BA2Fb09D6FF1D8f97140f1D85a54478Ac6478c', '100000000000000000000');
};
