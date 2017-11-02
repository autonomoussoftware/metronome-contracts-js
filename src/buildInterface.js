const log = res => {
  // result.tx => transaction hash, string
  // result.logs => array of trigger events (1 item in this case)
  // result.receipt => receipt object
  console.log(res)
  return res
}

const handleError = err => {
  console.error(err.stack)
  throw err
}

const buildInterface = ({
  context,
  metronome,
  smartContract,
  aux,
  reservetoken,
  pair
}) => ({
  // ERC223
  /**
    * transfer(address _to, uint _value, string _fallback, bytes _data)
    *
    * @param {_to} address
    * @param {_value} uint amount
    * @param {_fallback} is an string with the name of the function being called.
    * @param {_data} is the encoded parameters for that function.
    *
    * @returns {boolean}
    */
  // transfer: data => erc223.transfer(data).then(log).catch(handleError),
  /**
    * This is the function that ERC223 tokens are expected to call,
    * when transferring to the contract; it’s the equivalent of the fallback function.
    *
    * onTokenReceived(address _from, uint _value, bytes _data)
    *
    * @returns {boolean}
    */
  // onTokenReceived: data =>
  // contactReciever.onTokenReceived(data).then(log).catch(handleError),

  // Custom ERC20-related functions
  /**
    *
    * These are safer versions of approve. They’re not standard,
    * but can be used by users who want to avoid the chance of a well-known race attack
    * against the standard version when updating values.
    *
    * approveMore(address _spender, uint _value)
    *
    * @returns {boolean ok}
    */
  // approveMore: data => token.approveMore(data).then(log).catch(handleError),
  /**
    *
    * These are safer versions of approve. They’re not standard,
    * but can be used by users who want to avoid the chance of a well-known race attack
    * against the standard version when updating values.
    *
    * approveLess(address _spender, uint _value)
    *
    * @returns {boolean ok}
    */
  // approveLess: data => token.approveLess(data).then(log).catch(handleError),
  /**
    *
    * Allows multiple transfers in a single transaction.
    * Each uint in the bits array represents on transfer;
    * the leftmost 160 bits are the address,
    * and 96 bits to the right are the amount.
    *
    * function multiTransfer(uint[] bits)
    *
    * @returns {boolean ok}
    */
  // multiTransfer: data =>
  // reservetoken.log).catch(andleError),

  // Pair
  /**
  *
  * Change ETH to MTN. Throw if the returned MTN would be less than minReturn
  * Return the amount of MTN.
  *
  * @param  {minReturn}
  *
  * @returns (uint mtnAmount)
  */
  changeEthToMtn: data =>
    pair.changeEthToMtn(data).then(log).catch(handleError),

  /**
  *
  * Change MTN to ETH. Throw if the returned ETH would be less than minReturn
  * Return the amount of ETH.
  *
  * @param  {minReturn}
  *
  * @returns (uint ethAmount)
  */
  changeMtnToEth: data =>
    pair.changeMtnToEth(data).then(log).catch(handleError),
  /**
  *
  * Return how much MTN the user would get for the given _ethAmount.
  *
  * @param  {uint _ethAmount}
  *
  * @returns (uint mtnAmount)
  */
  ifChangeEthToMtn: data =>
    pair.ifChangeEthToMtn(data).then(log).catch(handleError),
  /**
  *
  * Return how much ETH the user would get for the given _mtnAmount.
  *
  * @param  {uint _mtnAmount}
  *
  * @returns (uint ethAmount)
  */
  ifChangeMtnToEth: data =>
    pair.ifChangeMtnToEth(data).then(log).catch(handleError),

  // Owner
  /**
  *
  * Mint the tokens owed to the founder
  *
  */
  founderMintTokens: data =>
    metronome.founderMintTokens(data).then(log).catch(handleError),
  /**
  *
  * Withdraw any ETH in the contract. This should only happen if sent via selfdestruct.
  *
  */
  founderWithdrawEth: data =>
    metronome.founderWithdrawEth(data).then(log).catch(handleError),
  /**
  *
  * Withdraw any ERC20 tokens erroneously sent to this contract.
  *
  */
  founderWithdrawTokens: data =>
    metronome.founderWithdrawTokens(data).then(log).catch(handleError),

  // Auction
  /**
  *
  * Standard fallback function; send ETH, get awarded tokens.
  *
  * @param  {Number} bytes32
  */
  payable: ({ from, value }) => metronome.sendTransaction({from, value: context.web3.toWei(value, 'ether')}).then(log).catch(handleError),
  minimumPrice: () => metronome.minimumPrice.call().then(log).catch(handleError),
  /**
  * Tells the user what the results would be, of a purchase at time _t
  *
  * Function whatWouldPurchaseDo(uint _eth, uint _t)
  *
  * @param  _t {Number} _t is the timestamp of the prospective auction purchase
  * @param _eth {Number} is the amount of ETH to be sent
  *
  * @returns {Object}
  * @property weiPerToken is the resulting price tokens is the number of tokens that
  * would be returned refund is the ETH refund the user would get (if exceeding daily limit)
  * @property numMinutes is the number of minutes between this prospective purchase and last one (deprecated soon)
  *
  */
  whatWouldPurchaseDo: ({ from, value, time }) =>
    metronome.whatWouldPurchaseDo.call({ from, value: context.web3.toWei(value, 'ether'), time }).then(log).catch(handleError),

  // Merkles
  // These functions aren’t intended for manual use,
  // but there’s some thought that they could be the foundation for interesting UI features.

  /**
  *
  * Sets the merkle root associated with msg.sender
  *
  * @param  {Number} bytes32
  */
  setRoot: data => reservetoken.setRoot(data).then(log).catch(handleError),

  /**
  * Returns true if the two addresses have matching roots.
  *
  * function rootsMatch(address a, address b)
  *
  * @returns  {Bool}
  */
  rootsMatch: data =>
    reservetoken.rootsMatch(data).then(log).catch(handleError),

  // Subscriptions
  /**
  * Subscribe to someone, i.e. authorize them to withdraw weekly payment
  *
  * function subscribe(uint _startTime, uint _payPerWeek, address_recipient)
  *
  * @param _startTime is when the subscription will start
  * @param _payPerWeek is the tokens payable per week including decimals
  * @param _recipient is who gets to withdraw the money
  *
  * @returns  {Bool}
  */
  subscribe: data => reservetoken.subscribe(data).then(log).catch(handleError),
  /**
  * Cancel the subscription
  *
  * function cancelSubscription(address _recipient)
  *
  * @param {_recipient} is who are you subscribed to that doesn’t make you happy now
  *
  * @returns  {Bool}
  */
  cancelSubscription: data =>
    reservetoken.cancelSubscription(data).then(log).catch(handleError),
  /**
  * Get subscription info
  *
  * function getSubscription(address _subscriber, address _subscribedTo)
  *
  * @param {_subscriber} pays
  * @param {_subscribedTo} gets paid
  * @param {_subscribedTo} gets paidstartTime is when the subscription started payPerWeek is how much can recipi-
ent withdraw each week lastWithdrawTime is when the recipient last withdrew
  *
  * @returns  {Bool}
  */
  getSubscription: data =>
    reservetoken.getSubscription(data).then(log).catch(handleError),
  /**
  * Withdraw funds from someone who has subscribed to you, returns success
  *
  * function subWithdraw(address _from)
  *
  * @param {_from} is your subscriber
  *
  * @returns
  */
  subWithdraw: data =>
    reservetoken.subWithdraw(data).then(log).catch(handleError),
  /**
  * Withdraw funds from a bunch of subscribers at once. Each uint in bits holds just an address.
  *
  * function multiSubWithdraw(uint[] bits)
  *
  * @param {_from} is your subscriber
  *
  * @returns
  */
  multiSubWithdraw: data =>
    reservetoken.multiSubWithdraw(data).then(log).catch(handleError)
})

module.exports = buildInterface
