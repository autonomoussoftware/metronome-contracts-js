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

const web3 = new Web3(new Web3.providers.HttpProvider(config.rpc.host))

test.skip('should subscribe and authorize them to withdraw weekly payment, query the state and cancel it', async () => {
  const mtn = metronome.createInstance(config)
  var accounts = web3.eth.accounts

  return mtn.then(mtn => {
    return mtn.subscribe(moment.unix(), 1, accounts[1])
      .then(res => mtn.getSubscription(accounts[1]))
      .then(res => mtn.subWithdraw([accounts[1]]))
      .then(res => mtn.multiSubWithdraw([accounts[1]]))
      .then(res => mtn.cancelSubscription(accounts[1]))
  })
})
