# metronomejs
JavaScript metronome library

# Usage

```
const metronome = require('metronomejs-lib')

const config = {
  rpc: {
    host: 'http://localhost:8545'
    user: ''
    pass: ''
  },
  account: {
    address: '0x95ba9614fb17e7b3721dde75993069ed69897684'
  }
}

const mtn = metronome.createInstance(config)

mtn.getLastPurchasePrice().then(function (price) {
  return mtn.buyMTN({ eth: 10000 }) // will use account address - signature?
    .then(function (status) {
      // status may have txid
    })
})
```

# Configuration

If none of the configuration is provided, the library is going to connect to 'http://localhost:8545'.