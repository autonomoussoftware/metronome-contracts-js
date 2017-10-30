const utils = require('./helpers/Utils');

const Owned = artifacts.require('Owned.sol');

contract('Owned', (accounts) => {
    it('verifies owner after construction', async () => {
        let contract = await Owned.new();
        let owner = await contract.owner.call();
        assert.equal(owner, accounts[0]);
    });

    /*
    it('verifies new owner after transfer', async () => {
        let contract = await Owned.new();
        await contract.transferOwnership(accounts[1]);
        await contract.acceptOwnership({ from: accounts[1] });
        let owner = await contract.owner.call();
        assert.equal(owner, accounts[1]);
    });

    it('verfies ownership transfer fires OwnerUpdate event', async () => {
        let contract = await Owned.new();
        await contract.transferOwnership(accounts[1]);
        let res = await contract.acceptOwnership({ from: accounts[1] });
        assert(res.logs.length > 0 && res.logs[0].event == 'OwnerUpdate');
    });

    //removed ability to transfer ownership
    //keeping this here just as example

    it('verifies that only owner can initiate ownership transfer', async () => {
        let contract = await Owned.new();

        //await utils.increaseTime(3);

        try {
            await contract.transferOwnership(accounts[1], { from: accounts[2] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });
    */
});

