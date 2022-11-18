const Custom = artifacts.require('customERC20');

module.exports = function (deployer) {
    deployer.deploy(Custom, "catellaTech", "ELLA");
};
