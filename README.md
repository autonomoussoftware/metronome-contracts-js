#Metronome

Install

```bash
npm install --save metronome
```

Usage

```javascript
const metronome = require('metronome')
const config = require('./mtn.config.json')

const mtn = metronome.createInstance(JSON.parse(config))
mtn.then(mtn => mtn.minimumPrice())
```

## mtn.config.json

In this json, you should provide the addrs of the contracts involved in metronome.
Next is an example of full config object:

```
const defaultConfig = {
  rpc: {
    host: 'http://localhost:8545'
    user: 'Bruce Wayne'
    pass: 'Im not batman'
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
``` 

## API

 # changeEthToMtn

 # changeMtnToEth

 # ifChangeEthToMtn

 # ifChangeMtnToEth

 # founderMintTokens

 # founderWithdrawEth

 # founderWithdrawTokens

 # payable

 # whatWouldPurchaseDo

 # setRoot

 # rootsMatch

 # subscribe

 # cancelSubscription

 # getSubscription

 # subWithdraw

 # multiSubWithdraw

 # minimumPrice