pragma solidity ^0.4.13;

import "truffle/Assert.sol";
import "../contracts/Metronome.sol";
import "../contracts/ReserveToken.sol";
import "../contracts/Constants.sol";

contract Person {
    function contribute(address met) payable {
	Metronome(met).call.value(msg.value)();
    }
    //have to receive refund
    function () payable {}
}

/*
met.init(
address _founder, 
address _aux,
uint _startTime, 
address _token, 
uint _minimumPrice,
uint _startingPrice) 
*/

contract TestMetronome is Constants {
    uint public initialBalance = 10 ether;
    Metronome met;
    ReserveToken tok;
    Person p1;
    Person p2;
    address a1;
    address a2;
    address aux = 0x123;
    function startup() {
	p1 = new Person();
	p2 = new Person();
	a1 = address(p1);
	a2 = address(p2);
	met = new Metronome();
	tok = new ReserveToken();
	tok.reserveInit(0x1, address(met), 1); //only met matters here
	uint initialPrice = (weiPerEth * 2004 / 10000) / MTNDECMULT; 
	met.init(this, aux, 1, address(tok), 1000, initialPrice);
    }

    function testTokenSet() {
	startup();
	Assert.equal(address(tok), met.token(), "Token not set correctly");
	Assert.equal(met.owner(), this, "owner");
    }

    function testTime() {
	startup();
	Assert.equal(0, met.currTime(), "time");
    }

    function testAuctionStartHour25() {
	startup();

	uint t = 1 days + 1 hours;
	uint auctionStartTime = 1;
	uint lastPurchasePrice = 1000;
	var (startTime, startPrice, startTokens) = 
	     met.nextAuction(t, auctionStartTime, 0, lastPurchasePrice);
	Assert.equal(startTime, 1 days + 1, "start time");
	Assert.equal(startTokens, 1440 * MTNDECMULT, "start tokens");
	Assert.equal(startPrice, 2001, "start price");
    }

    function testAuctionStartHour15() {
	startup();

	uint t = 15 hours;
	uint auctionStartTime = 1;
	uint lastPurchasePrice = 1000;
	var (startTime, startPrice, startTokens) = 
	     met.nextAuction(t, auctionStartTime, 0, lastPurchasePrice);
	Assert.equal(startTime, 1 days + 1, "start time");
	Assert.equal(startTokens, 1440 * MTNDECMULT, "start tokens");
	Assert.equal(startPrice, 2001, "start price");
    }

    function testAuctionStartHour49() {
	startup();

	uint t = 49 hours;
	uint auctionStartTime = 1;
	uint lastPurchasePrice = 1000;
	var (startTime, startPrice, startTokens) = 
	     met.nextAuction(t, auctionStartTime, 0, lastPurchasePrice);
	Assert.equal(startTime, 2 days + 1, "start time");
	Assert.equal(startTokens, 2880 * MTNDECMULT, "start tokens");
	Assert.equal(startPrice, 2001, "start price");
    }
}


