module.exports = client => ({
  // ERC223
  /**
    * transfer(address _to, uint _value, string _fallback, bytes _data)
    *
    * @param {_fallback} is the name of the function being called.
    * @param {_data} is the encoded parameters for that function.
    *
    * @returns {boolean ok}
    */
  transfer: () => client.transfer().then(res => {}),
  /**
    * This is the function that ERC223 tokens are expected to call,
    * when transferring to the contract; it’s the equivalent of the fallback function.
    *
    * onTokenReceived(address _from, uint _value, bytes _data)
    *
    * @returns {boolean ok}
    */
  onTokenReceived: () => client.onTokenReceived().then(res => {}),

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
  approveMore: () => client.approveMore().then(res => {}),
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
  approveLess: () => client.approveLess().then(res => {}),
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
  multiTransfer: () => client.multiTransfer().then(res => {}),

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
  changeEthToMtn: () =>
    client.changeEthToMtn().then(res => {
      // result.tx => transaction hash, string
      // result.logs => array of trigger events (1 item in this case)
      // result.receipt => receipt object
    }),

  /**
  * 
  * Change MTN to ETH. Throw if the returned ETH would be less than minReturn
  * Return the amount of ETH.
  *
  * @param  {minReturn}
  *
  * @returns (uint ethAmount)
  */
  changeMtnToEth: () => client.changeMtnToEth().then(res => {}),
  /**
  * 
  * Return how much MTN the user would get for the given _ethAmount.
  *
  * @param  {uint _ethAmount} 
  *
  * @returns (uint mtnAmount)
  */
  ifChangeEthToMtn: () => client.ifChangeEthToMtn().then(res => {}),
  /**
  * 
  * Return how much ETH the user would get for the given _mtnAmount.
  *
  * @param  {uint _mtnAmount} 
  *
  * @returns (uint ethAmount)
  */
  ifChangeMtnToEth: () => client.ifChangeMtnToEth().then(res => {}),

  // Owner
  /**
  *
  * Mint the tokens owed to the founder
  *
  */
  founderMintTokens: () => client.founderMintTokens().then(res => {}),
  /**
  *
  * Withdraw any ETH in the contract. This should only happen if sent via selfdestruct.
  *
  */
  founderWithdrawEth: () => client.founderWithdrawEth().then(res => {}),
  /**
  *
  * Withdraw any ERC20 tokens erroneously sent to this contract.
  *
  */
  founderWithdrawTokens: () => client.founderWithdrawTokens().then(res => {}),

  // Auction
  /**
  *
  * Standard fallback function; send ETH, get awarded tokens.
  *
  * @param  {Number} bytes32
  */
  payable: () => client.payable().then(res => {}),
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
  whatWouldPurchaseDo: () => client.whatWouldPurchaseDo().then(res => {}),

  // Merkles
  // These functions aren’t intended for manual use, 
  // but there’s some thought that they could be the foundation for interesting UI features.

  /**
  *
  * Sets the merkle root associated with msg.sender
  *
  * @param  {Number} bytes32
  */
  setRoot: () => client.setRoot().then(res => {}),

  /**
  * Returns true if the two addresses have matching roots.
  *
  * function rootsMatch(address a, address b) 
  *
  * @returns  {Bool}
  */
  rootsMatch: () => client.rootsMatch().then(res => {}),

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
  subscribe: () => client.subscribe().then(res => {}),
  /**
  * Cancel the subscription
  *
  * function cancelSubscription(address _recipient)
  *
  * @param {_recipient} is who are you subscribed to that doesn’t make you happy now
  *
  * @returns  {Bool}
  */
  cancelSubscription: () => client.cancelSubscription().then(res => {}),
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
  getSubscription: () => client.getSubscription().then(res => {}),
  /**
  * Withdraw funds from someone who has subscribed to you, returns success
  *
  * function subWithdraw(address _from)
  *
  * @param {_from} is your subscriber
  *
  * @returns 
  */
  subWithdraw: () => client.subWithdraw().then(res => {}),
  /**
  * Withdraw funds from a bunch of subscribers at once. Each uint in bits holds just an address.
  * 
  * function multiSubWithdraw(uint[] bits)
  *
  * @param {_from} is your subscriber
  *
  * @returns 
  */
  multiSubWithdraw: () => client.multiSubWithdraw().then(res => {})
})
