// Metronome autonomus converter contract
const build = ({ context, pair, log, handleError }) => ({
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
    pair
      .changeEthToMtn(data)
      .then(log)
      .catch(handleError),

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
    pair
      .changeMtnToEth(data)
      .then(log)
      .catch(handleError),
  /**
*
* Return how much MTN the user would get for the given _ethAmount.
*
* @param  {uint _ethAmount}
*
* @returns (uint mtnAmount)
*/
  ifChangeEthToMtn: data =>
    pair
      .ifChangeEthToMtn(data)
      .then(log)
      .catch(handleError),
  /**
*
* Return how much ETH the user would get for the given _mtnAmount.
*
* @param  {uint _mtnAmount}
*
* @returns (uint ethAmount)
*/
  ifChangeMtnToEth: data =>
    pair
      .ifChangeMtnToEth(data)
      .then(log)
      .catch(handleError)
})

module.exports = { build }
