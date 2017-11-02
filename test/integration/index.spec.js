const chai = require('chai')
const Web3 = require('web3')
var moment = require('moment')

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
      addr: '0xb7c76bf1dc1032fc588280e5a261ab7d1b2677d6'
    },
    reservetoken: {
      addr: '0x83ca2cbed33652b6b93a9f4c1a6a93ed6f7de9d4'
    },
    smartContract: {
      addr: '0xae9f4f03c991558092ad60556cb36b4908bcc806'
    },
    aux: {
      addr: '0x3381421f6e84c67f4625a511d4a5cbbdafd70c3a'
    },
    pair: {
      addr: '0x2997ce1b1be5fdb0ab735688466793e13c7ae2a0'
    }
  }
}

const web3 = new Web3(new Web3.providers.HttpProvider(config.rpc.host)) // this is needed to have access to accounts in the testrpc node

test('should init the client correctly', () => {
  const mtn = metronome.createInstance(config)
  return mtn.then(mtn =>
    mtn.should.have.all.keys(
      'changeEthToMtn',
      'changeMtnToEth',
      'ifChangeEthToMtn',
      'ifChangeMtnToEth',
      'founderMintTokens',
      'founderWithdrawEth',
      'founderWithdrawTokens',
      'payable',
      'whatWouldPurchaseDo',
      'setRoot',
      'rootsMatch',
      'subscribe',
      'cancelSubscription',
      'getSubscription',
      'subWithdraw',
      'multiSubWithdraw',
      'minimumPrice'
    )
  )
})

test.skip('should get auction data', async () => {
  const mtn = metronome.createInstance(config)
  var accounts = web3.eth.accounts

  return mtn.then(mtn => {
    return mtn.whatWouldPurchaseDo({ from: accounts[0], value: 1, time: moment.unix() })
      .then(res => {
        console.log(res)
        return res
      })
  })
})

test.skip('should deposit eth and get mtn', async () => {
  const mtn = metronome.createInstance(config)
  var accounts = web3.eth.accounts

  return mtn.then(mtn => {
    return mtn.payable({ from: accounts[0], value: 1 })
      .then(res => {
        console.log(res)
        return res
      })
  })
})
