const customToken = artifacts.require('customERC20');

contract('customToken', (accounts) => {
    console.log('Accounts: ', accounts);

    // variables mas uzadas
    let _owner_ = accounts[0];
    let _account1 = accounts[1];

    // Comprobando el owner
    describe('Owner', () => {
        it('✨ Tets Owner ✨', async () => {
            let token = await customToken.deployed();
            const _owner = await token.owner.call();
            console.log('Owner account: ', _owner_);
            assert.equal(_owner, _owner_);
        });
    });

    describe('Name, Symbol & Decimals', () => {
        // Token name test
        it('✨ Token Name ✨', async () => {
            let token = await customToken.deployed();

            let _name = await token.name.call();
            console.log('Token name: ', _name);

            assert.equal(_name, 'catellaTech');
        });

        // Token symbol test
        it('✨ Token Symbol ✨', async () => {
            let token = await customToken.deployed();

            let _symbol = await token.symbol.call();
            console.log('Token symbol: ', _symbol);

            assert.equal(_symbol, 'ELLA');
        });

        // Token decimal test
        it('✨ Token Decimal ✨', async () => {
            let token = await customToken.deployed();

            let _decimals = await token.decimals.call();
            console.log('Token decimals: ', _decimals);

            assert.equal(_decimals, 18);
        });
    });

    describe('Supply & New Tokens', () => {
        // Token supply test
        it('✨ New Token ✨', async () => {
            let token = await customToken.deployed();

            let initial_supply = await token.totalSupply.call();
            console.log('Token initial supply: ', initial_supply);
            assert.equal(initial_supply, 0);

            // Creando nuevos Tokens
            await token.crearTokens();
            let current_supply = await token.totalSupply.call();
            console.log('Current supply: ', current_supply);
            assert.equal(current_supply, 1000);

            // Comprobando el balance
            let _balance = await token.balanceOf.call(_owner_);
            assert.equal(_balance, 1000);
        });

        // Token transfer test
        it('✨ Transfer Token ✨', async () => {
            let token = await customToken.deployed();
            // transfer function
            await token.transfer(_account1, 10, {from: _owner_});
            // balance de la cuenta 0
            let _balance0 = await token.balanceOf.call(_owner_);
            assert.equal(_balance0, 1000 - 10);
            // balance de la cuenta 1
            let _balance1 = await token.balanceOf.call(_account1);
            assert.equal(_balance1, 10);
        });
    });

    describe('Allowance, Increase & Descrease Allowance', () => {
        // Token allowance, approve, transferFrom
        it('✨ Allowance, Approve and TransferFrom  ✨', async () => {
            let token = await customToken.deployed();

            // allowance
            let initial_allowance = await token.allowance(_owner_, _account1);
            assert.equal(initial_allowance, 0);

            // approve
            await token.approve(_account1, 100, {from: _owner_});

            let current_allowance = await token.allowance(_owner_, _account1);
            assert.equal(current_allowance, 100);

            // verificando que el balance de la cuenta 1, sigue teniendo los mismos 10 tokens del test anterior
            let _balance1 = await token.balanceOf.call(_account1);
            assert.equal(_balance1, 10);

            let _account2 = accounts[2];

            // transferFrom a la cuenta 2
            await token.transferFrom(_owner_, _account2, 100, {
                from: _account1,
            });

            let allowance_afterTransfer = await token.allowance(
                _owner_,
                _account1
            );
            assert.equal(allowance_afterTransfer, 0);

            // balance de la cuenta 2
            let _balance2 = await token.balanceOf.call(_account2);
            assert.equal(_balance2, 100);
        });

        // Incrementando y decrementando el allowance
        it('✨ increaseAllowance and decreaseAllowance ✨', async () => {
            let token = await customToken.deployed();
            let _account5 = accounts[5];

            // approve
            await token.approve(_account5, 100, {from: _owner_});

            let initial_allowance_account5 = await token.allowance(
                _owner_,
                _account5
            );
            assert.equal(initial_allowance_account5, 100);

            // increase allowance
            await token.increaseAllowance(_account5, 300);

            let current_allowance_account5 = await token.allowance(
                _owner_,
                _account5
            );
            assert.equal(current_allowance_account5, 400);

            // decrease allowance
            await token.decreaseAllowance(_account5, 50);

            let decrease_allowance_account5 = await token.allowance(
                _owner_,
                _account5
            );
            assert.equal(decrease_allowance_account5, 350);
        });
    });

    describe('Burning Tokens', () => {
        // Quemando Tokens
        it('✨ Burn Tokens ✨', async () => {
            let token = await customToken.deployed();
            // balance de la cuenta0  antes de la quema de tokens
            let before_burn = await token.balanceOf.call(_owner_);
            console.log('balance before burn: ', before_burn);

            // destruir tokens
            await token.destruirTokens(_owner_, 200);

            let after_burned = await token.balanceOf.call(_owner_);
            console.log('Balance after burn: ', after_burned);
            assert.equal(after_burned, 690);
        });
    });
});
