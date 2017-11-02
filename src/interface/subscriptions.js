// Subscriptions
const build = ({ context, reservetoken, log, handleError }) => ({
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

module.exports = { build }
