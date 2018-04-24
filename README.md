<h1 align="center">
  <img src="./logo.png" alt="Metronome JS" width="50%">
</h1>

� JavaScript client for [Metronome Token](http://metronome.io). This module provides a shiny metronome contracts object (using `web3 1.x.x`) ready to use. Compatible with Node.js and Web Browsers.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Index

1. [Requirements](#requirements)
1. [Dev Setup](#dev-setup)
1. [Prod Setup](#prod-setup)
1. [Usage](#usage)
1. [Interface](#interface)
1. [License](#license)

## Requirements
- [Node.js](https://nodejs.org/en/) / Web Browsers
- [Web3](https://github.com/ethereum/web3.js/)


##  Dev Setup
```bash
# Install dependencies
$ npm i

# Init webpack in dev mode
$ npm run dev

# Start demo application
$ npm run demo
```

## Prod Setup
```bash
# Install dependencies
$ npm i

# Build for production
$ npm run build

# Publish to npm registry
$ npm publish
```

## Usage

Install dependency using npm or yarn: `$ npm i -S metronomejs`

```js
const Web3 = require('web3')
const metronome = require('metronomejs')

const provider = new Web3.providers.WebsocketProvider(this.config.webSocketUrl)
const mtn = metronome.getInstance(provider)

console.log(mtn.mtntoken.options)

/* Output
> {
    address: '0x1234567890123456789012345678901234567891',
    jsonInterface: [...],
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    gasPrice: '10000000000000',
    gas: 1000000
}
*/

const from = '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'

mtn.mtntoken.options.from(myaddr)
mtn.mtntoken.options.address(contractAddress)

mtn.mtntoken.name.call().then(name => console.log('Token name: ', name) )

mtn.mtntoken.symbol.call({ from }).then(symbol => console.log('Token symbol: ', symbol))

mtn.mtntoken.totalSupply.call({ from }).then(totalSupply => console.log('Total Supply: ', totalSupply))

mtn.mtntoken.balanceOf.call(Web3.eth.accounts[0]).then(bal => console.log('Balance: ', bal.toString(10)))

const value = '100' // Base 10, accounts for decimals.
mtn.mtntoken.transfer(toAddress, value, { from }).then(txHash => console.dir(txHash))
```

## Interface

  - `metronome.getInstance()`

    Creates a web3 contract instance for Metronome Token.

    ```js
    const Web3 = require('web3')
    const metronome = require('metronomejs')

    const provider = new Web3.providers.WebsocketProvider(this.config.webSocketUrl)
    const instance = metronome.getInstance(provider)
    ```

    > The provider should be valid web3 `1.0.x`, for more information check [documentation](http://web3js.readthedocs.io/en/1.0/include_package-core.html?highlight=provider)


## LICENSE

[MIT License](https://github.com/MetronomeToken/metronome-auction-brd/blob/develop/LICENSE).
