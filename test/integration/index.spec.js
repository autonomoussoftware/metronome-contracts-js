const chai = require('chai')
const Web3 = require('web3')

// const ethWallet = require('ethereumjs-wallet')
// const wallet = ethWallet.generate()
// console.log(wallet)
// Wallet { _privKey: <Buffer>, _pubKey: undefined }

const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const metronome = require('../../src/index')

const config = {
  rpc: {
    host: 'http://localhost:8545'
  },
  contracts: {
    metronome: {
      addr: '0x6f3edef37761576944ae316873bdbba82d4c6462'
    },
    reservetoken: {
      addr: '0x68fb00f02629591271242e35227ad2e23f42430f'
    },
    smartContract: {
      addr: '0x6140c07376eabb3a08132358fb579fa6ddf2bf90'
    },
    aux: {
      addr: '0x85a597646c80f183ca03399bde962afc5ddd6dc4'
    },
    pair: {
      addr: '0x35a5a4ae879fd3ab4b181cc539e99c11d00fc455'
    }
  }
}

const web3 = new Web3(new Web3.providers.HttpProvider(config.rpc.host)) // this is needed to have access to accounts in the testrpc node

test('should init the client correctly', () => {
  const mtn = metronome.createInstance(config)
  return mtn.then(mtn => {
    mtn.should.have.all.keys(
      'autonomusConverter',
      'erc20',
      'erc223',
      'merkles',
      'metronome',
      'subscriptions'
    )

    mtn.autonomusConverter.should.have.all.keys(
      'changeEthToMtn',
      'changeMtnToEth',
      'ifChangeEthToMtn',
      'ifChangeMtnToEth'
    )

    mtn.erc20.should.have.all.keys(
      'getName',
      'getSymbol',
      'getDecimals',
      'totalSupply',
      'balanceOf',
      'transfer',
      'transferFrom',
      'approve',
      'allowance',
      'TransferEvent',
      'ApprovalEvent',
      'approveMore',
      'approveLess',
      'multiTransfer'
    )

    mtn.erc223.should.have.all.keys(
      'transfer',
      'onTokenReceived'
    )

    mtn.merkles.should.have.all.keys(
      'setRoot',
      'rootsMatch'
    )

    mtn.metronome.should.have.all.keys(
      'payable',
      'whatWouldPurchaseDo',
      'founderMintTokens',
      'founderWithdrawEth',
      'founderWithdrawTokens',
      'minimumPrice'
    )

    mtn.subscriptions.should.have.all.keys(
      'subscribe',
      'cancelSubscription',
      'getSubscription',
      'subWithdraw',
      'multiSubWithdraw'
    )
  })
})

test('should get auction data', async () => {
  const mtn = metronome.createInstance(config)
  var accounts = web3.eth.accounts

  return mtn.then(mtn => mtn.metronome.whatWouldPurchaseDo({ from: accounts[0], value: 1, time: 180 }))
    .then(res => console.log(res))
})

test.skip('should get name data', async () => {
  const mtn = metronome.createInstance(config)
  return mtn.then(mtn => mtn.erc20.getName())
})

test.skip('should get symbol data', async () => {
  const mtn = metronome.createInstance(config)
  return mtn.then(mtn => mtn.erc20.getSymbol())
})

test.skip('should get decimal data', async () => {
  const mtn = metronome.createInstance(config)
  return mtn.then(mtn => mtn.erc20.getDecimals())
})

test('should deposit eth and get mtn', async () => {
  const mtn = metronome.createInstance(config)
  var accounts = web3.eth.accounts

  return mtn.then(mtn => {
    return mtn.metronome.payable({ from: accounts[0], value: 1, gas: 1000000 })
      .then(res => {
        console.log(res)
        return res
      })
  })
})
