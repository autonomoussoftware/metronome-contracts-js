pragma solidity ^0.4.13;

import "truffle/Assert.sol";
import "../contracts/Metronome.sol";
import "../contracts/ReserveToken.sol";
import "../contracts/Constants.sol";
import "../contracts/Pricer.sol";
import "../contracts/Pair.sol";
import "../contracts/Aux.sol";

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

contract TestMetronome4 is Constants {
    uint public initialBalance = 10 ether;
    TestPricer pricer;
    Metronome met;
    ReserveToken tok;
    Person p1;
    Person p2;
    address a1;
    address a2;
    Aux aux = new Aux();
    IPair pair = new IPair();
    function startup() {
	p1 = new Person();
	p2 = new Person();
	a1 = address(p1);
	a2 = address(p2);
	met = new Metronome();
	tok = new ReserveToken();
	tok.reserveInit(0x1, address(met), 1); //only met matters here
	uint initialPrice = (weiPerEth * 2004 / 10000) / MTNDECMULT; 
	met.init(this, address(aux), 1, address(tok), 1000, initialPrice);
        aux.init(address(pair), address(met));
        pricer = new TestPricer();        
    }

    function testTwoAuctions() {
	startup();

	uint val = 1 ether;
        uint mins = 3; //2 * 60 - 1;
	uint price = pricer.price(met.lastPurchasePrice(), mins);
        uint expectedTokens = val / price;

        uint t = mins * (1 minutes);
	met.addTime(t);
	p1.contribute.value(val)(address(met));
	Assert.equal(tok.balanceOf(a1), expectedTokens, "expected");

        price = price * 2 + 1;
        expectedTokens = val / price;

        t =  24 hours;
	met.addTime(t);
        uint ct = met.currTime();
	var (weiPerToken, tokens, refund, numMinutes) = met.whatWouldPurchaseDo(val, ct);
	Assert.equal(weiPerToken, price, "price");
	Assert.equal(tokens, expectedTokens, "tokens");

	p2.contribute.value(val)(address(met));
	Assert.equal(tok.balanceOf(a2), expectedTokens, "expected2");
    }


}


