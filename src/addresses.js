'use strict'

const mainnet = {
  auctions: '0x9d9BcDd249E439AAaB545F59a33812E39A8e3072',
  autonomousConverter: '0x686e5ac50D9236A9b7406791256e47feDDB26AbA',
  metToken: '0xa3d58c4E56fedCae3a7c43A725aeE9A71F0ece4e'
}

const ropsten = {
  auctions: '0x767182c6ef62398993099e5542ab43c2456a8aba',
  autonomousConverter: '0x638e84db864aa345266e1aee13873b860afe82e7',
  metToken: '0xf3e9a687fdf24112745d4d7dee150ba87a07ecc3'
}

const addresses = {
  1: mainnet,
  3: ropsten,
  main: mainnet,
  mainnet,
  ropsten
}

module.exports = addresses
