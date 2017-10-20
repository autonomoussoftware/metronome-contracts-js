pragma solidity >=0.4.13;

contract Pricers {
/*
    uint public tentimes;
    uint public hundredtimes;
    uint public thousandtimes;

    function Pricer() {
        uint x = 10**15;
        uint i;
        for (i = 0; i < 10; i++) {
            x = (x * 99) / 100;
        }
        tentimes = x;
        x = 10**15;
        for (i = 0; i < 10; i++) {
            x = (x * tentimes) / 10**15;
        }
        hundredtimes = x;
        x = 10**15;
        for (i = 0; i < 10; i++) {
            x = (x * hundredtimes) / 10**15;
        }
        thousandtimes = x;
        
        bigprices[0] = 10**15;
        uint mult1 = 10**15 * 99 / 100;
        prices[0] = ((10**15)<<128) | mult1;
    }

    function fastPrice(uint initialPrice, uint _n) returns (uint price) {
        uint mult = 10**15;
        uint i;
        uint n = _n;
        if (n / 1000 > 0) {
            for (i = 0; i < n / 1000; i++) {
                mult = mult * thousandtimes / 10**15;
            }
            n = n % 1000;
        }

        if (n / 100 > 0) {
            for (i = 0; i < n / 100; i++) {
                mult = mult * hundredtimes / 10**15;
            }
            n = n % 100;
        }

        if (n / 10 > 0) {
            for (i = 0; i < n / 10; i++) {
                mult = mult * tentimes / 10**15;
            }
            n = n % 10;
        }
        
        for (i = 0; i < n; i++) {
            mult = mult * 99 / 100;
        }
        price = initialPrice * mult / 10**15;
    }
    
    function easyPrice(uint initialPrice, uint _n) returns (uint price) {
        uint mult = 10**15;
        for (uint i = 0; i < _n; i++) {
            mult = (mult * 99) / 100;
        }
        price = (initialPrice * mult) / 10**15;
    }
    
    //2X as much to store but makes constant gas cost
    uint[1000] bigprices;
    uint public biginited;
    function storedBigPrice(uint initialPrice, uint _n) returns (uint price) {
        return initialPrice * bigprices[_n] / 10**15;
    }
    function initBigPrices() {
        uint i;
        for (i = 1; i < 100 && i + biginited < 1000; i++) {
            prices[biginited + i] = prices[biginited + i - 1] * 99 / 100;
        }
        biginited = biginited + i - 1;
    }
    
    uint[1000] prices;
    uint public inited;
    function storedPrice(uint initialPrice, uint _n) returns (uint price) {
        //uint multLeft = prices[_n / 2] >> 128;
        //uint multRight = prices[_n / 2] & (2**128 - 1);
        uint mult;
        if (_n % 2 == 0) {
            //price = initialPrice * multLeft / 10**15;
            //mult = ((prices[_n / 2] << 1) >> 129);
            mult = prices[_n / 2] >> 128;
        } else {
            //price = initialPrice * multRight / 10**15;
            //mult = prices[_n / 2] & (2**128 - 1);
            //mult = ((prices[_n / 2] << 1) >> 1) & (2**128 - 1);
            //mult = ((prices[_n / 2] << 128) >> 128); // & (2**128 - 1);
            mult = prices[_n / 2] & (2**128 - 1);
        }
        return initialPrice * mult / 10**15;
    }
    function storedPrice2(uint initialPrice, uint _n) returns (uint price) {
        uint multLeft = prices[_n / 2] >> 128;
        uint multRight = prices[_n / 2] & (2**128 - 1);
        //uint lefter = _n % 2 == 0;
        //uint righter = _n % 2 == 1;
        uint mult;
        return initialPrice * mult / 10**15;
    }

    function initPrices() {
        uint i;
        uint left = prices[inited] >> 128;
        uint right = prices[inited] & (2**128 - 1);
        for (i = 1; i < 100 && i + inited < 1000; i++) {
            left = right * 99 / 100;
            right = left * 99 / 100;
            prices[inited + i] = (left << 128) | right;
        }
        inited = inited + i - 1;
    }

    function hybridPrice(uint initialPrice, uint _n) returns (uint price) {
	uint mult = 10**15;
        if (_n < 1000) {
            return storedBigPrice(initialPrice, _n);
        } else {
            for (uint i = 0; i < _n / 1000; i++) {
                mult = mult * thousandtimes / 10**15;
            }
            uint n = _n % 1000;
            mult = mult * bigprices[n];
            return initialPrice * mult / 10**15;
        }
    }
    
    function comparePrice(uint initialPrice, uint _n) 
    returns (uint init, uint n, uint easy, uint fast, uint stored, uint hybrid) {
        easy = easyPrice(initialPrice, _n);
        fast = fastPrice(initialPrice, _n);
        stored = storedPrice(initialPrice, _n);
        hybrid = hybridPrice(initialPrice, _n);
        init = initialPrice;
        n = _n;
    }
*/
}


