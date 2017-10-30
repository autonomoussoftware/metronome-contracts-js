pragma solidity ^0.4.13;

import "truffle/Assert.sol";
import "../contracts/Metronome.sol";
import "../contracts/ReserveToken.sol";
import "../contracts/Pricer.sol";
import "../contracts/Constants.sol";

contract Person {
    function contribute(address met) payable {
	Metronome(met).call.value(msg.value)();
    }
    //have to receive refund
    function () payable {}
}

contract TestPricer is Pricer {
    function price(uint initialPrice, uint n) 
    returns (uint) {
        return currentPrice(initialPrice, n);
    }
}

contract TestMetronome2 is Constants {
    uint public initialBalance = 10 ether;
    Metronome met;
    ReserveToken tok;
    Person p1;
    Person p2;
    address a1;
    address a2;
    address aux = 0x123;
    TestPricer pricer;
    function startup() {
	p1 = new Person();
	p2 = new Person();
	a1 = address(p1);
	a2 = address(p2);
	met = new Metronome();
	tok = new ReserveToken();
	tok.reserveInit(0x1, address(met), 1000); //only met matters here
	met.init(this, aux, 1, address(tok), 1000, 0);
        pricer = new TestPricer();
    }

/*  
    function testTokenBalance0Minutes() {
	startup();
        Assert.equal(met.lastPurchaseTime(), met.auctionStartTime(), "times");
	uint val = 1 ether;
        uint mins = 0;
	uint price = pricer.price(met.lastPurchasePrice(), mins);
        //Assert.equal(1, price, "zero?"); //not zero
        //Assert.equal(2, val/price, "valprice?");
        //uint expectedTokens = val / price;
        //Assert.equal(3, expectedTokens, "valprice?");

        uint t = mins * (1 minutes);
	met.addTime(t);
	p1.contribute.value(val)(address(met));
        Assert.equal(1, price, "price2"); //throws, but move up before "uint t" and fine
        //Why?

	//Assert.equal(expectedTokens, 3, "temp"); //this one throws, so weird
	//Assert.equal(tok.balanceOf(a1), val/price, "expected");
    }

    function testInitialPrice() {
	//uint initialPrice = (weiPerEth * 2004 / 10000) / MTNDECMULT; //fine
        uint x = met.lastPurchasePrice(); //invalid opcode
        //uint price = pricer.price(met.lastPurchasePrice(), 0);
        //Assert.equal(initialPrice, price, "initial");
    }
*/

    function testPricer() {
	startup();
	met.addTime(2 minutes);
	uint val = 1 ether;
	uint expectedPrice = (met.lastPurchasePrice() * 99 / 100) * 99 / 100;
        uint pricerPrice = pricer.price(met.lastPurchasePrice(), 2);
	Assert.equal(expectedPrice, pricerPrice, "pricer");
    }

    
    function testTokenBalance1Minute() {
	startup();
        Assert.equal(met.lastPurchaseTime(), met.auctionStartTime(), "times");
	uint val = 1 ether;
        uint mins = 1;
	uint price = pricer.price(met.lastPurchasePrice(), mins);
        uint expectedTokens = val / price;

        uint t = mins * (1 minutes);
	met.addTime(t);
	p1.contribute.value(val)(address(met));
	Assert.equal(tok.balanceOf(a1), expectedTokens, "expected");
    }

    function testTokenBalance2Hours() {
	startup();
        Assert.equal(met.lastPurchaseTime(), met.auctionStartTime(), "times");
	uint val = 1 ether;
        uint mins = (2 * 60) - 1;
	uint price = pricer.price(met.lastPurchasePrice(), mins);
        uint expectedTokens = val / price;

        uint t = mins * (1 minutes);
	met.addTime(t);
	p1.contribute.value(val)(address(met));
	Assert.equal(tok.balanceOf(a1), expectedTokens, "expected");
    }

/*
    function testTokenBalance12Hours() {
	startup();
	uint val = 1 ether;
        uint mins = (12 * 60) - 1;
	uint price = pricer.price(met.lastPurchasePrice(), mins);
        uint expectedTokens = val / price;

        uint t = mins * (1 minutes);
	met.addTime(t);
	p1.contribute.value(val)(address(met));
	Assert.equal(tok.balanceOf(a1), expectedTokens, "expected");
    }
    function testTokenBalance20Hours() {
	startup();
	uint val = 1 ether;
        uint mins = (20 * 60) - 1;
	uint price = pricer.price(met.lastPurchasePrice(), mins);
        uint expectedTokens = val / price;

        uint t = mins * (1 minutes);
	met.addTime(t);
	p1.contribute.value(val)(address(met));
	Assert.equal(tok.balanceOf(a1), expectedTokens, "expected");

	var (weiPerToken, tokens, refund, numMinutes) = met.whatWouldPurchaseDo(100 * 10**18, 1);
	Assert.equal(weiPerToken, price, "price");
	Assert.equal(tokens, expectedTokens, "tokens");
	Assert.equal(refund, 0, "refund");
	Assert.equal(numMinutes, 0, "minutes");
        
    }
*/

    //at 23 hours we exceed token allocation with a 1-eth contribution
    function testTokenBalance23Hours() {
	startup();
	uint val = 1 ether;
        uint mins = (23 * 60) - 1;
	uint price = pricer.price(met.lastPurchasePrice(), mins);
        uint expectedTokens = val / price;
        uint supply = 10**7 * 10**8;
        Assert.isTrue(expectedTokens > supply, "exceeding supply");

        uint t = mins * (1 minutes);
	met.addTime(t);
	p1.contribute.value(val)(address(met));

	Assert.equal(tok.balanceOf(a1), supply, "whole supply");
    }
}

