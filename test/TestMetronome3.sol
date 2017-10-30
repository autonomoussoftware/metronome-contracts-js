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

contract TestMetronome3 is Constants {
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

    //TODO: WWPD test fails after new check:
    //return zeros if weiPerToken > eth contributed
    //but we're contributing plenty eth here...
    function testWhatWouldPurchaseDo() {
	startup();
	uint price = (weiPerEth * 2004 / 10000) / MTNDECMULT; 
	uint expectedTokens = 100 * weiPerEth / price;

	var (weiPerToken, tokens, refund, numMinutes) = met.whatWouldPurchaseDo(100 * 10**18, 1);
	Assert.equal(weiPerToken, price, "price");
	Assert.equal(tokens, expectedTokens, "tokens");
	Assert.equal(refund, 0, "refund");
	Assert.equal(numMinutes, 0, "minutes");
    }

    function testAuxBalance() {
	startup();
	met.addTime(2 minutes);
	uint val = 1 ether;
	p1.contribute.value(val)(address(met));
	Assert.equal(this.balance, initialBalance - val, "remaining");
	address aux = met.aux();
	Assert.equal(aux.balance, val, "aux balance");
    }

    function testTokenBalance() {
	startup();
	met.addTime(2 minutes);
	uint val = 1 ether;
	uint price = (weiPerEth * 2004 / 10000) / MTNDECMULT; 
	price = price * 99 / 100;
	price = price * 99 / 100;
	uint expectedTokens = val / price;

	p1.contribute.value(val)(address(met));
	Assert.equal(tok.balanceOf(a1), expectedTokens, "expected");
    }

}

