pragma solidity >=0.4.13;

import "./Pricer.sol";
import "./Owned.sol";
import "./IToken.sol"; 
import "./Aux.sol";
import "./Constants.sol";
import "./SafeMath.sol";

//could descend from ringbuffer but so far not using it
contract Metronome is Pricer, Owned, Constants {
    using SafeMath for uint256;
    address public token;
    Aux public aux;
    address public founder;

    uint public minimumPrice;
    
    uint public lastPurchaseTime;
    uint public lastPurchasePrice;
    uint public auctionStartTime;
    uint public availableTokens;
    uint public constant globalDailySupply = 1440 * MTNDECMULT;
    uint public initialSupply = 10000000 * MTNDECMULT;
    uint public mintRights = initialSupply;
    uint public totalMigratedOut = 0;
    uint public totalMigratedIn = 0;

    bool public finishedFirstAuction;

    modifier running() {
	require(currTime() >= auctionStartTime);
	_;
    }

    function isRunning() public constant returns (bool) {
        return (currTime() >= auctionStartTime);
    }
    function currentTime() public constant returns (uint) {
        return currTime();
    }

    //for testing purposes
    //We rely on testrpc starting at block zero
    //this way we don't have to read storage in prod
    //TODO: make internal
    uint currtime;
    function currTime() public returns (uint) { 
	if (block.number > 100000 && block.timestamp > 1000000) {
	    return block.timestamp;
	} else {
	    return currtime;
	}

    }
    function addTime(uint t) 
    //onlyOwner  //leaving open for now so easier on testnet
                 //won't have any effect on livenet
    {
	currtime = currtime.add(t);
    }
    //end testing section

    function Metronome() 
    {
	//initial supply for first auction
	availableTokens = initialSupply; 
    }

    /// @notice Initialize Metronome parameters
    /// @param _founder The recipient of 20% of ETH from first-day auction
    /// @param _startTime The block.timestamp when first auction starts
    /// @param _token The address of the token contract
    /// @param _minimumPrice Nobody can buy tokens for less than this price
    function init(address _founder, 
		  address _aux,
		  uint _startTime, 
		  address _token, 
		  uint _minimumPrice,
		  uint _startingPrice) 
    public onlyOwner
    {
        require(founder == 0x0);
        require(_founder != 0x0);
        require(_token != 0x0);
        require(_aux != 0x0);

	founder = _founder;
	aux = Aux(_aux);
	if (_startTime > 0) {
	    auctionStartTime = _startTime;
	} else {
	    auctionStartTime = currTime();
	}
        lastPurchaseTime = auctionStartTime;
	token = _token;

	if (_minimumPrice > 0) {
	    minimumPrice = _minimumPrice;
	} else {
	    minimumPrice = 1;
	}

	//Price is the number of wei required per token
	//where token is the smallest increment, not whole non-fractional
	//this is the initial price for first auction
	//whitepaper page 7 sets it at .2004 ETH per whole token
	if (_startingPrice > 0) {
	    lastPurchasePrice = _startingPrice;
	} else {
	    lastPurchasePrice = (weiPerEth * 2004 / 10000) / MTNDECMULT; 
	}
    }

    /// Trip safety cutoff
    ///
    /// Only allowed before initial auction starts
    function stopEverything() public onlyOwner {
	if (auctionStartTime > currTime()) revert();
	auctionStartTime = auctionStartTime + 1000 years;
    }

    function globalMtnSupply() 
    internal
    returns (uint) {
        uint numdays = (currTime() - auctionStartTime) / (1 days);
        return initialSupply + (globalDailySupply * numdays);
        //all small numbers without user input, don't need safemath
    }

    function auctionSupply()
    internal
    returns (uint) {
        //mintRights + totalMigratedIn - totalMigratedOut
        //is the total tokens on this chain
        //included those not yet purchased
        //divide by globalMtnSupply to see what fraction of global supply is here
        //and multiply that by the daily to see how many we can mint here today
        //(but we do this in a different order to avoid roundoff issues)

        //token.destroy() ensures can't migrate out more than we have
        uint tokensHere = mintRights + totalMigratedIn - totalMigratedOut;

        //this is safe as long as tokensHere is never within 1440x of 2^256
        //we have to ensure  that anyway 
        //if we used safemath and it failed then no more auctions
        //With reasonable decimal places, is fine
        //return (globalDailySupply * tokensHere) / globalMtnSupply();

        //the above returned zero
        //skipping until sure we need this
        
        //or return globalDailySupply if we don't do cross-chain cap
        return globalDailySupply;
    }

    /// Actually start the next day's auction, using parameters from nextAuction()
    function restartAuction() 
    private 
    {
	//If we were in first auction, say it's complete now
	if (!finishedFirstAuction) {
	    finishedFirstAuction = true;
	}

	var (t, price, tok) = 
	    nextAuction(currTime(), auctionStartTime, lastPurchasePrice);
        auctionStartTime = t;
        mintRights += tok - availableTokens; //(just want additional)
        availableTokens = tok;
        lastPurchasePrice = price;
    }


    /// Get the starting parameters of the next daily auction
    ///
    /// @param _t The block.timestamp of the first contribution in next auction
    /// @param _auctionStartTime The prior auction's start time
    /// @param _lastPurchasePrice The lowest purchase price in the prior auction
    /// @return _startTime The start time of the new auction
    /// @return _startPrice Initial price in the new auction (weiPerToken)
    /// @return _startTokens Token supply in new auction, including leftovers from prior
    function nextAuction(
	uint _t, 
	uint _auctionStartTime, 
	uint _lastPurchasePrice) 
    public constant
    returns (uint _startTime, uint _startPrice, uint _auctionTokens) 
    {
        uint elapsed = _t - _auctionStartTime;
        uint numdays = elapsed / (1 days);

	//if auction ended early, start next at 24-hour mark
        if (numdays == 0) {
	    numdays = 1;
	}

        _startTime = _auctionStartTime + (numdays * (1 days));

        //even if we skipped days we add expected number of tokens
	//so supply is predictable
	//also add leftover tokens from previous auction
        _auctionTokens = (auctionSupply() * numdays); 
        
        //we always *2 on lastpurchaseprice regardless of lapsed time
	//and we add one wei to make extra sure we never hit zero
        _startPrice = (_lastPurchasePrice * 2) + 1;
    }

    /// Internal function to calculate results of a purchase
    /// Maybe make this public and skip whatWouldPurchaseDo
    ///
    /// Get number of minutes since the last purchase
    /// Multiply price by .99 for each full minute since last purchase
    /// If the price is below standard minimum price, return all zeros: TODO: why?
    /// If the eth buys more tokens than what's remaining that day,
    /// then refund the excess eth to the buyer.
    ///
    /// @param _eth Amount of ether the purchaser will pay
    /// @param _t Prospective purchase timestamp
    /// @return weiPerToken The purchase price
    /// @return tokens Number of tokens purchaser will get
    /// @return refund The eth refund the purchaser will get
    /// @return numMinutes The integer number of minutes since prior purchase
    function calcPurchase(uint _eth, uint _t)
    public constant //TODO: make internal 
    returns (uint weiPerToken, uint tokens, uint refund, uint numMinutes)
    {
        numMinutes = (_t - auctionStartTime) / 1 minutes;
        weiPerToken = currentPrice(lastPurchasePrice, numMinutes);
	if (weiPerToken < minimumPrice || weiPerToken > _eth) {
	    //return (0, 0, 0, numMinutes); //TODO uncommment
	}
        uint calctokens = _eth / weiPerToken; 
	tokens = calctokens;   
        if (calctokens > availableTokens) {
            tokens = availableTokens;
	    uint ethPaying = availableTokens * weiPerToken;
            refund = _eth - ethPaying;
        }
    }

    event LogNumber(uint x);

    /// Take eth payment, award tokens, possibly send refund
    /// 
    /// If more than a day has passed since auction start, then start new auction
    /// If calculated token price is zero, it's gone below minimum so exit
    /// Set lastPurchaseTime, lastPurchasePrice, remaining availableTokens
    /// If purchaser tips us over daily tokens for sale, send a refund
    /// If this is first auction, reserve 20% of eth for the founder
    /// Mint the tokens, send the refund, send remaining eth to price support contract
    function () 
    public payable 
    running
    {
        LogNumber(msg.value);

        if (currTime() - auctionStartTime > 1 days) {
            restartAuction();
	    aux.closeAuction();
	    //note we close auction now, add our new eth to it a few lines down
	    //so we close with the eth it had in last auction, now we're in new auction
        }

	var (weiPerToken, tokens, refund, numMinutes) = calcPurchase(msg.value, currTime());
	require(weiPerToken > 0); 

	//purchase time should always be an integer number of minutes
	//so our metronome ticks steadily
        lastPurchaseTime = lastPurchaseTime + (numMinutes * 1 minutes);
        lastPurchasePrice = weiPerToken;
        availableTokens = availableTokens - tokens;

        assert(refund < msg.value);
	uint ethForAux = msg.value - refund;
        assert(ethForAux <= msg.value);

	//first auction sends 20% of tokens to owner
	if (!finishedFirstAuction) {
            uint tempTokens = tokens;
            tokens = tokens * 4 / 5;
            founderTokens += tempTokens - tokens;
	}

	//eth send to known contract so also doesn't have to be last
        aux.transfer(ethForAux);

	//mint new tokens for contributor immediately
	//external call to a known token contract, so doesn't have to be last 
        require(IToken(token).mint(msg.sender, tokens));

	//if contributor needing refund has an expensive fallback,
	//we just reject the contribution when transfer throws
        if (refund > 0) {
	    msg.sender.transfer(refund);
        }
    }       
    uint founderTokens;

    function founderMintTokens() public onlyOwner {
        uint tokens = founderTokens;
        founderTokens = 0;
        require(IToken(token).mint(founder, tokens));
    }

    /// Allow founder to withdraw funds
    ///
    /// We never store eth balance for a purchaser
    /// so this won't happen except by selfdestruct transfer
    function founderWithdrawEth() public onlyOwner {
	founder.transfer(this.balance);
    }

    /// Allow founder to withdraw arbitrary ERC20 tokens on this contract's address
    ///
    /// @param _token The address of the ERC20 token
    function founderWithdrawTokens(address _token) public onlyOwner {
	IToken(_token).transfer(founder, IToken(_token).balanceOf(this));
    }

    /// Find out what the results would be of a prospective purchase
    ///
    /// @param _eth Amount of ether the purchaser will pay
    /// @param _t Prospective purchase timestamp
    /// @return weiPerToken The purchase price
    /// @return tokens Number of tokens purchaser will get
    /// @return refund The eth refund the purchaser will get
    /// @return numMinutes The integer number of minutes since prior purchase
    function whatWouldPurchaseDo(uint _eth, uint _t)
    public constant
    returns (uint weiPerToken, uint tokens, uint refund, uint numMinutes)
    {
	(weiPerToken, tokens, refund, numMinutes) = calcPurchase(_eth, _t);
    }

    //************************************************************
    //cross-chain migrations
    //this has a long way to go 
    //but it's enough to start testing overall design
    //************************************************************

/*
    //stubs for cross-chain functionality
    //actually need a more flexible architecture

    function migrateOut(uint amount) {
        require(IToken(token).destroy(msg.sender, amount));
        totalMigratedOut = totalMigratedOut.add(amount);
    }

    //migrateIn requires some kind of limit. 
    //Will not be simple call like this.
    function migrateIn(uint amount) {
        require(IToken(token).mint(msg.sender, amount));
        totalMigratedIn = totalMigratedIn.add(amount);
    }
*/

}

