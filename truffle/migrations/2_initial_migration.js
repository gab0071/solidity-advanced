const Ganache = artifacts.require("Ganache");

module.exports = function (deployer) {
  deployer.deploy(Ganache);
};
