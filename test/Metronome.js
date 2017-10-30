const utils = require('./helpers/Utils')
const BigNumber = require('bignumber.js')

const Metronome = artifacts.require('Metronome.sol')
// const Token = artifacts.require('Token.sol');
const ReserveToken = artifacts.require('ReserveToken.sol')
const Aux = artifacts.require('Aux.sol')
const Pair = artifacts.require('Pair.sol')

// https://ethereum.stackexchange.com/questions/4027/how-do-you-get-the-balance-of-an-account-using-truffle-ether-pudding
const promisify = inner =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  )

const getBalance = (account, at) =>
  promisify(cb => web3.eth.getBalance(account, at, cb))

const sendEther = (f, t, v) =>
  promisify(cb => web3.eth.sendTransaction({ from: f, to: t, value: v }, cb))
// fwiw this actually crashes testrpc:
// await web3.eth.sendTransaction({from: accounts[0], to: accounts[1], amount: 3});

contract('Metronome', accounts => {
  it('verifies owner after construction', async () => {
    let contract = await Metronome.new()
    let owner = await contract.owner.call()
    assert.equal(owner, accounts[0])
  })

  it('verifies init', async () => {
    let met = await Metronome.new()
    let tok = await ReserveToken.new()
    let aux = await Aux.new()
    // initialPrice = 10**18 * 2004 / 10000) / 10**8 = 10**6 * 2004
    let initialPrice = new BigNumber('2004000000')

    await met.init(accounts[1], aux.address, 0, tok.address, 1000, initialPrice)

    let tokaddr = await met.token.call()
    assert.equal(tok.address, tokaddr, 'token address')

    let founderaddr = await met.founder.call()
    assert.equal(founderaddr, accounts[1], 'founder address')

    let auxaddr = await met.aux.call()
    assert.equal(aux.address, auxaddr, 'aux address')

    let minimumPrice = await met.minimumPrice.call()
    assert.equal(minimumPrice, 1000, 'min price')
  })

  it('tests deposit', async () => {
    let met = await Metronome.new()
    let tok = await ReserveToken.new()
    let aux = await Aux.new()
    let pair = await Pair.new()
    let initialPrice = new BigNumber('2004000000')
    await met.init(accounts[1], aux.address, 0, tok.address, 1000, initialPrice)
    await tok.reserveInit(pair.address, met.address, 1)
    await aux.init(pair.address, met.address)

    let bal = await getBalance(accounts[0])
    console.log(bal.toString(10))

    let amount = web3.toWei(1, 'ether')
    console.log(amount)
    console.log(amount * 2)

    let finished = await met.finishedFirstAuction.call()
    console.log('finished: ', finished)

    var bal1 = await getBalance(accounts[1])
    await sendEther(accounts[0], accounts[1], 1)
    var bal2 = await getBalance(accounts[1])
    assert.equal(bal2.toString(), bal1.plus(1).toString(), 'added') // sendEther works

    // var currTime = await met.currentTime();
    // assert.equal(currTime.toString(), 1, "time");
    // var block = await getBlock();
    // assert.equal(block, 1, "block");
    // var start = await met.auctionStartTime();
    // assert.equal(start.toString(), 1, "start");
    var running = await met.isRunning()
    assert.equal(running, true, 'running')

    /*
        */
    await sendEther(accounts[0], met.address, amount)
  })
})

/*
    it('tests deposit', async () => {
        let met = await Metronome.new();
        let tok = await Token.new();
	let initialPrice = (10**18 * 2004 / 10000) / 10**8;
        await met.init(accounts[1], 0, tok.address, 1000, initialPrice);
        await tok.setSeller(met.address);

        let bal = await getBalance(accounts[0]);
        console.log(bal.toString(10));

        let amount = web3.toWei(1, "ether");
        console.log(amount);
        console.log(amount * 2);

        let finished = await met.finishedFirstAuction.call();
        console.log("finished: ", finished);

        await sendEther(accounts[0], met.address, amount);
        let stab = await met.stabilizer.call();
        let balstab = await getBalance(stab);
        console.log("balstab: ", balstab.toString());
        //assert.equal(balstab, amount * 2 / 3, "stabilizer balance");
    });
*/
