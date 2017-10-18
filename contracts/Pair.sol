pragma solidity ^0.4.13;

import './IToken.sol';
import './Formula.sol';

contract Pair is Formula {
    //there are always two assets with ratio 0.5
    //and we're hardcoding one asset to be ETH

    ISmartToken public smartToken;
    IReserveToken public reserveToken;
    address aux;

    enum WhichToken { Eth, Mtn }

    bool public changingEnabled = true; 

    function init(address _reserveToken, address _smartToken, address _aux)
    {
        reserveToken = IReserveToken(_reserveToken);
        smartToken = ISmartToken(_smartToken);
        aux = _aux;
    }

    // allows execution only when changing isn't disabled
    modifier changingAllowed {
        require(changingEnabled);
        _;
    }

    function balanceOf(WhichToken which) internal returns (uint) {
        if (which==WhichToken.Eth) return this.balance;
        if (which==WhichToken.Mtn ) return reserveToken.balanceOf(this);
        revert();
    }

    ///returns the expected return for buying the smart token for a reserve token
    function mintingReturn(WhichToken which, uint _depositAmount)
    internal
    returns (uint amount)
    {
        uint256 smartTokenSupply = smartToken.totalSupply();
        uint256 reserveBalance = balanceOf(which);
        amount = returnForMint(
            smartTokenSupply, 
            reserveBalance, 
            _depositAmount);
    }

    ///returns the expected return for selling the smarttoken 
    ///for one of its reserve tokens
    function redemptionReturn(WhichToken which, uint smartTokensSent) 
    internal
    returns (uint256 amount) 
    {
        uint smartTokenSupply = smartToken.totalSupply();
        uint reserveTokenBalance = balanceOf(which);
        return returnForRedemption(
            smartTokenSupply, 
            smartTokensSent, 
            reserveTokenBalance);
    }

    ///buys the token by depositing one of its reserve tokens
    function mint(
        WhichToken whichReserve, 
        uint _depositAmount, 
        uint _minReturn)
    internal
    returns (uint256 amount) 
    {
        require(_minReturn > 0);
        amount = mintingReturn(WhichToken.Eth, _depositAmount);
        require(amount >= _minReturn); 
        smartToken.mint(msg.sender, amount); 
    }

    function mintFromEth(uint _minReturn) 
    payable 
    returns (uint amount) {
        amount = mint(WhichToken.Eth, msg.value, _minReturn);
    }

    function mintFromReserve(uint _depositAmount, uint _minReturn) returns (uint amount) {
        amount = mint(WhichToken.Mtn, _depositAmount, _minReturn);

        //actually transfer the reserve tokens into Pair
        //need a special function so user doesn't have to approve first
        //plus we don't allow normal transfer from token to pair
        require(reserveToken.transferByPair(msg.sender, this, _depositAmount)); 
    }

    function depositFromAux() payable {
        require(msg.sender == aux);
        //do nothing, just dumping in ETH
    }

    /// sells the token by withdrawing from one of its reserve tokens
    function redeem(WhichToken which, uint _amount, uint _minReturn)
    internal
    returns (uint amount) 
    {
        require(_amount <= smartToken.balanceOf(msg.sender)); 
        require(_minReturn > 0);

        amount = redemptionReturn(which, _amount);
        require(amount >= _minReturn); 

        uint256 reserveBalance = balanceOf(which);
        require(amount <= reserveBalance); 
        uint256 tokenSupply = smartToken.totalSupply();

        //ensure that the trade will only deplete the reserve 
        //if the total supply is depleted as well
        require(amount < reserveBalance || _amount == tokenSupply); 

        smartToken.destroy(msg.sender, _amount); 
        if (which == WhichToken.Eth) {
            msg.sender.transfer(amount);
        } 
        else {
            require(reserveToken.transfer(msg.sender, amount)); 
        }
                                                           
        return amount;
    }

    function redeemForEth(uint _amount, uint _minReturn) returns (uint amount) {
        return redeem(WhichToken.Eth, _amount, _minReturn);
    }
    function redeemForReserve(uint _amount, uint _minReturn) returns (uint amount) {
        return redeem(WhichToken.Mtn, _amount, _minReturn);
    }

    //****************************************
    //change token/eth in a single transaction
    //****************************************

    ///returns the expected return for changing 
    ///a specific amount of from -> to
    function getReturn(WhichToken whichFrom, uint fromAmount)
    internal
    returns (uint toAmount)
    {
        WhichToken to = WhichToken.Mtn;
        if (whichFrom == WhichToken.Mtn) to = WhichToken.Eth;

        uint mintRet = mintingReturn(whichFrom, fromAmount);
        return redemptionReturn(to, mintRet);
    }

    ///changes a specific amount of _fromToken to _toToken
    function change(WhichToken whichFrom, uint _amount, uint _minReturn)
    returns (uint amount)
    {
        WhichToken to = WhichToken.Mtn;
        if (whichFrom == WhichToken.Mtn) to = WhichToken.Eth;

        uint mintRet = mintingReturn(whichFrom, _amount);
        uint ret = redemptionReturn(to, mintRet);
        require(ret >= _minReturn);

        //intermediate minreturn doesn't matter, only final
        mint(whichFrom, _amount, 1);
        return redeem(to, mintRet, _minReturn);
    }

}
