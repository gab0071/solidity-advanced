const ganache = artifacts.require('Ganache');

// llamamos al contrato
contract('ganache', (accounts) => {
    console.log('Accounts: ', accounts);

    // Comenzamos a hacer nuestro tests
    // testeando Owner
    it('✨ Owner ✨', async () => {
        let instance = await ganache.deployed();
        const _owner = await instance.owner.call();
        console.log('Owner account: ', accounts[0]);
        assert.equal(_owner, accounts[0]);
    });
    
    // Testeando smart contract address
    it('✨ Smart contract ✨ ', async () => {
        let instance = await ganache.deployed();
        const sc = await instance.smartContract();
        const _smartContract = await instance.smartContract.call();
        console.log('SC account: ', _smartContract);
        assert.equal(_smartContract, sc);
    });

    // Testeando getMessage
    it('✨ getMessage ✨', async () => {
        let instance = await ganache.deployed();
        const _getMessage = await instance.getMessage.call();
        assert.equal(_getMessage, '');
    });

    // Testeando la funcion setMessage & getMessage
    it('✨ setMessage & getMessage ✨', async () => {
        let instance = await ganache.deployed();
        const message = 'Hi, we are catellatech';
        const _setMessage = await instance.setMessage(message, {
            from: accounts[0],
        });
        console.log('_setMessage: ', _setMessage);
        const _getMessage = await instance.getMessage.call();
        assert.equal(message, _getMessage);
    });
});
