# Metronome tiny client

Metronome client.

This module provide a shiny metronome contracts object ready to use.

Uses web3 1.x.x.

# Install
```batch
$ npm install --save metronomejs
```

# Usage
```js
const metronome = require('metronomejs')
const mtn = metronome.getInstance(provider)

console.log(mtn.mtntoken.options)

// > {
//     address: '0x1234567890123456789012345678901234567891',
//     jsonInterface: [...],
//     from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
//     gasPrice: '10000000000000',
//     gas: 1000000
// }

mtn.mtntoken.options.from(myaddr)
mtn.mtntoken.options.address(contractAddress)

mtn.mtntoken.name.call().then(name => console.log('The token name is: ' + name) )
 
mtn.mtntoken.symbol.call({from: addr}).then(symbol => console.log('Token symbol: ' + symbol))
 
mtn.mtntoken.totalSupply.call({from: addr}).then(totalSupply => console.log(totalSupply))
 
mtn.mtntoken.balanceOf.call(web3.eth.accounts[0]).then(bal => console.log('balance is ' + bal.toString(10)))
 
const value = '100' // Base 10, accounts for decimals. 
mtn.mtntoken.transfer(toAddress, value, { from: addr }).then(txHash => console.dir(txHash))

```


# Interface

### metronome.getInstance()

Creates a web3 contract mtn.

```js
const instance = metronome.getInstance(provider)
```
Parameters

- `provider`
A valid web3 provider for 1.0.x versions, see details [here](http://web3js.readthedocs.io/en/1.0/include_package-core.html?highlight=provider)