pragma solidity >=0.4.13;

import './Constants.sol';

//sqrt from: 
//https://stackoverflow.com/questions/3766020/binary-search-to-compute-square-root-java

//NOTE: assuming same number of decimals in both numbers for mul/div

contract FixedMath is Constants {

    function fMul(uint x, uint y) internal returns (uint) {
        uint z = x * y;
        require(z / x == y);
        
        return z / DECMULT;
    }

    function fDiv(uint numerator, uint divisor) internal returns (uint) {
        require(divisor > 0);
        return (numerator * DECMULT) / divisor;
    }

    function fSqr(uint n) internal returns (uint) {
        uint z = n * n;
        require (z / n == n);
        return z / DECMULT;
    }

    //cheaper internal sqr for use by fSqrt
    function sqr(uint n) internal returns (uint) {
        return (n * n) / DECMULT;
    }

    function fSqrt(uint n) internal returns (uint) {
        uint z = n * n;
        require (z / n == n);

        uint high = n;
        uint low = 0;
        while (high-low > 1) {
            uint mid = (low+high) / 2;
            if (sqr(mid) <= n) {
                low = mid;
            } else {
                high = mid;
            }
        }
        return low;
    }

    //for completeness so we don't have to mix in safemath for fixed point:

    function fAdd(uint x, uint y) internal returns (uint) {
        require(x + y > x);
        return x + y;
    }

    function fSub(uint x, uint y) internal returns (uint) {
        require(x >= y);
        return x - y; 
    }
}




