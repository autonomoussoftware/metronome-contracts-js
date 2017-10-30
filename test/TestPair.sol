pragma solidity ^0.4.13;

import "truffle/Assert.sol";
import "../contracts/Constants.sol";
import "../contracts/Pair.sol";
import "../contracts/Aux.sol";
import "../contracts/SmartToken.sol";
import "../contracts/ReserveToken.sol";

contract TestPair is Constants {
    uint public initialBalance = 10 ether;

    ReserveToken reserveToken;
    SmartToken smartToken;
    Aux aux;
    Pair pair;
    
    function setup() {
        reserveToken = new ReserveToken();
        smartToken = new SmartToken();
        aux = new Aux();
        pair = new Pair();
        smartToken.init(address(pair), address(pair), 10**4); //initial supply is arbitrary
        reserveToken.reserveInit(address(pair), 0x1, 1); //supply decimals multipled in init()
        pair.init(address(reserveToken), address(smartToken), address(aux));
        aux.init(address(pair), this);
        uint val = 2 ether;
        aux.transfer(val);
        aux.closeAuction();
        //token.init puts initial balances in pair
        Assert.equal(reserveToken.balanceOf(address(pair)), MTNDECMULT, "bad init");
    }

    //from eth to reserve
    function test1() {
        setup();
        uint val = 1 ether;
        pair.mintFromEth.value(val)(1); 

        uint smartBal = smartToken.balanceOf(this);

        //assert is reasonably close, for now
        //Assert.isTrue(247 * DECMULT - smartBal < DECMULT, "new fruit");
        //Assert.equal(smartBal, DECMULT, "some fruit");
        Assert.isTrue(smartBal > 0, "zero fruit");

        uint reserve = pair.redeemForReserve(smartBal, 1);
        /*

        //Assert.isTrue(reserve - 47*DECMULT < DECMULT, "return");
        //Assert.isTrue(reserve > 0, "zero return");
        */
    }

    //from reserve to eth
    //we rely on test1 to give a token balance to "this"
    function test2() {
    /*
        test1();
        uint startingEth = this.balance;
        pair.mintFromReserve(100, 1);
        uint smartBal = smartToken.balanceOf(this);

        //assert is reasonably close, for now
        //Assert.isTrue(247 * DECMULT - smartBal < DECMULT, "new fruit");

        pair.redeemForEth(smartBal, 1);
        uint newEth = this.balance - startingEth;
        //Assert.isTrue(newEth - 47*DECMULT < DECMULT, "return");
        Assert.isTrue(newEth > 0, "zero newEth");
     */   
    }

    function () payable {}

}

