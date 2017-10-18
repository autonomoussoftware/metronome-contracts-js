pragma solidity >=0.4.13;

import "./ContractReceiver.sol";
import "./Owned.sol";
import "./SafeMath.sol";
import "./Token.sol";

contract ReserveToken is Token {
    using SafeMath for uint256;

    //for reserveToken the minter is the auction contract
    //function init(address _pair, address _minter, uint _initialSupply) {
    //    init(_pair, _minter, _initialSupply, MTNDECMULT);
    //}
    function reserveInit(address _pair, address _minter, uint _initialSupply) {
        init(_pair, _minter, _initialSupply, MTNDECMULT);
    }

    //pair has power to move tokens
    //also we prohibit simply transferring tokens to pair

    //normal minter is the auction contract
    //however we give a small initial supply to the pair contract

    function transferByPair(address _from, address _to, uint _amount) returns (bool) {
        require(msg.sender == pair);

        balanceOf[_from] = balanceOf[_from].sub(_amount);
        balanceOf[_to] = balanceOf[_to].add(_amount);
        
        Transfer(_from, _to, _amount);
        return true;
    }

    //************************************************************ 

    //only the minter can call destroy
    //because we use the auction contract to manage cross-chain migrate
    function destroy(address _a, uint _amount) 
    returns (bool) {
        require(msg.sender == minter);
        balanceOf[_a] = balanceOf[_a].add(_amount);
        totalSupply = totalSupply.sub(_amount);
        Transfer(_a, 0x0, _amount);
    }

    //************************************************************ 

    // We store a bytes32 hash value for each user
    // UI will interpret these as merkle roots and do the rest

    mapping (address => bytes32) public merkleRoots;
    function setRoot(bytes32 root) {
	merkleRoots[msg.sender] = root;
    }

    /// Convenience function to see if two users have the same root
    function rootsMatch(address a, address b) constant returns (bool) {
	return merkleRoots[a] == merkleRoots[b];
    }

    // **********************************************

    /// Allow user to transfer to multiple recipients in one transaction
    ///
    /// User must construct an array of uints
    /// With each, the left 160 bits is the recipient address
    /// and the right 96 bits is the token amount
    /// This is all or nothing
    /// If any transfers fail, they all roll back
    /// 
    /// @param bits The input array of recipients/amounts
    function multiTransfer(uint[] bits) {
        for (uint i=0; i<bits.length; i++) {
	    address a = address(bits[i]>>96);
	    uint amount = bits[i]&((1<<96) - 1);
	    if (!doTransferFrom(msg.sender, a, amount)) revert();
        }
    }

    // **********************************************
    // Subscriptions
    // **********************************************

    // Subscriptions let user set an amount that somone can withdraw per week
    // The recipient is responsible for withdrawing it each week
    // If recipient forgets, the amount accumulates
    // However, funds are not locked to ensure funds will stay available in this case
    // Locking more as time passes would require a loop 
    // through all subscriptions on every balance check
    // and still wouldn't ensure payment
    // Or, if we locked all up front, might as well just pay up front
    
    struct Sub {
	uint startTime;        // when the subscription started
	uint payPerWeek;       // in tokens, including decimals
	uint lastWithdrawTime; // last time subscribedTo withdrew funds
    }

    // We just log subscriber/subscribedTo
    // The rest of the subscription information can be retrieved given that info
    // by calling the constant function getSubscription(subscriber, subscribedTo)

    event LogSubscription(address indexed subscriber, address indexed subscribesTo);
    event LogCancelSubscription(address indexed subscriber, address indexed subscribesTo);
    
    //subscriber => subscribedTo => Sub
    mapping (address => mapping (address => Sub)) public subs;

    /// Subscribe to someone, i.e. authorize them to withdraw weekly payment
    ///
    /// @param _startTime When the subscription will start
    /// @param _payPerWeek Tokens payable per week including decimals
    /// @param _recipient Who gets to withdraw the money
    function subscribe(uint _startTime, uint _payPerWeek, address _recipient) {
	subs[msg.sender][_recipient] = Sub(_startTime, _payPerWeek, currTime());
	LogSubscription(msg.sender, _recipient);
    }

    /// Cancel your subscription
    ///
    /// @param _recipient Who are you subscribed to that doesn't make you happy now
    function cancelSubscription(address _recipient) {
	subs[msg.sender][_recipient].startTime = 0;
	subs[msg.sender][_recipient].payPerWeek = 0;
	subs[msg.sender][_recipient].lastWithdrawTime = 0;
	LogCancelSubscription(msg.sender, _recipient);
    }

    /// Get subscription info
    ///
    /// @param _subscriber Who is paying
    /// @param _subscribedTo Who is getting paid
    /// @return startTime When did this subscription start
    /// @return payPerWeek How much can recipient withdraw each week
    /// @return lastWithdrawTime When did recipient last withdraw
    function getSubscription(address _subscriber, address _subscribedTo) 
    constant
    returns (uint startTime, uint payPerWeek, uint lastWithdrawTime)
    {
	Sub storage sub = subs[_subscriber][_subscribedTo];
	return (sub.startTime, sub.payPerWeek, sub.lastWithdrawTime);
    }

    /// withdraw funds from someone who has subscribed to you
    ///
    /// @param _from Your subscriber
    /// @return bool success if it worked
    function subWithdraw(address _from) {
	Sub storage sub = subs[_from][msg.sender];
	uint amount = ((currTime() - sub.lastWithdrawTime) / 1 weeks).mul(sub.payPerWeek);
	subs[_from][msg.sender].lastWithdrawTime = currTime();
	if (!doTransferFrom(_from, msg.sender, amount)) revert();
    }

    /// Withdraw funds from a bunch of subscribers at once
    ///
    /// Each uint holds just an address, not an amount
    /// Leaving it as uint to keep client code similar
    /// and I think EVM won't pack any better if we used address[]
    /// Like multiTransfer, this is all or nothing
    /// If any transfer fails, they all do, by throwing exception
    /// This happens automatically due to revert in subWithdraw()
    ///
    /// @param bits Array of uints each holding an address
    function multiSubWithdraw(uint[] bits) {
        for (uint i=0; i<bits.length; i++) {
	    address a = address(bits[i]);
	    subWithdraw(a);
        }
    }

}
