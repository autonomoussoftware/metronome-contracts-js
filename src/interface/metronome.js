const build = ({ context, metronome, log, handleError }) => ({
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
  payable: ({ from, value, gas }) =>
    metronome
      .sendTransaction({ from, gas, value: context.web3.toWei(value, 'ether') })
      .then(log)
      .catch(handleError),
  minimumPrice: () =>
    metronome.minimumPrice.call().then(log).catch(handleError),
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
    metronome.whatWouldPurchaseDo
      .call(context.web3.toWei(value, 'ether'), time, { from })
      .then(log)
      .catch(handleError)
})

module.exports = { build }
