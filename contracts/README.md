## Methods Mapping from the contracts used by metronomejs

### ContractReceiver.sol
  - onTokenReceived

### Token.sol
  - approveMore
  - approveLess
  Appears in several interfaces

### ReserveToken.sol (Subscriptions, Merkles)
  - multiTransfer
  - setRoot
  - rootsMatch
  - subscribe
  - cancelSubscription
  - getSubscription
  - subWithdraw
  - multiSubWithdraw

### Metronome.sol (Owner functions, Auction)
  - founderMintTokens
  - founderWithdrawTokens
  - whatWouldPurchaseDo
  - payable

### ERC223.sol 
  - transfer (is it correct?)

### Pair.sol (Pair)
Not founded in the contracts

- changeEthToMtn
- changeMtnToEth
- ifChangeEthToMtn
- ifChangeMtnToEth
