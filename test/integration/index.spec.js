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
    metronome: '0xb7c76bf1dc1032fc588280e5a261ab7d1b2677d6',
    reservetoken: '0x83ca2cbed33652b6b93a9f4c1a6a93ed6f7de9d4',
    smartContract: '0xae9f4f03c991558092ad60556cb36b4908bcc806',
    aux: '0x3381421f6e84c67f4625a511d4a5cbbdafd70c3a',
    pair: '0x2997ce1b1be5fdb0ab735688466793e13c7ae2a0'
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
