pragma solidity ^0.4.13;

import "truffle/Assert.sol";
import "../contracts/Constants.sol";
import "../contracts/FixedMath.sol";

contract FixedMathTest is FixedMath {
    function tMul(uint x, uint y) returns (uint) {
        return fMul(x,y);
    }
    function tDiv(uint numerator, uint divisor) returns (uint) {
        return fDiv(numerator, divisor);
    }
    function tSqr(uint n) returns (uint) {
        return fSqr(n);
    }
    function tSqrt(uint n) returns (uint) {
        return fSqrt(n);
    }
    function tAdd(uint x, uint y) returns (uint) {
        return fAdd(x,y);
    }
    function tSub(uint x, uint y) returns (uint) {
        return fSub(x,y); 
    }
}

contract TestFixedMath is Constants {

    FixedMathTest m = new FixedMathTest();

    function testMul1() {
        uint x = 2 * DECMULT;
        uint y = 3 * DECMULT;
        uint prod = m.tMul(x,y);
        Assert.equal(prod, 6 * DECMULT, "product");
    }

    function testMul2() {
        uint x = 2 * DECMULT;
        uint y = 3 * DECMULT / 2;
        uint prod = m.tMul(x,y);
        Assert.equal(prod, 6 * DECMULT / 2, "product");
    }

    function testDiv1() {
        uint x = 6 * DECMULT;
        uint y = 3 * DECMULT;
        uint d = m.tDiv(x,y);
        Assert.equal(d, 2 * DECMULT, "div");
    }

    function testDiv2() {
        uint x = 6 * DECMULT;
        uint y = 12 * DECMULT;
        uint d = m.tDiv(x,y);
        Assert.equal(d, DECMULT / 2, "div");
    }

    function testSqr1() {
        uint x = 2 * DECMULT;
        uint s = m.tSqr(x);
        Assert.equal(s, 4 * DECMULT, "sqr");
    }

    function testSqr2() {
        uint x = DECMULT / 2;
        uint s = m.tSqr(x);
        Assert.equal(s, DECMULT / 4, "sqr");
    }

    function testSqrt1() {
        uint x = 121 * DECMULT;
        uint s = m.tSqrt(x);
        Assert.equal(s, 11*DECMULT, "sqrt");
    }
}
