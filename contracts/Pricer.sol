pragma solidity >=0.4.13;

contract Pricer {

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
    }

    /// Get the current price
    ///
    /// @param initialPrice The starting price
    /// @param _n The number of times to multiply price by 0.99
    /// @return The resulting price
    function currentPrice(uint initialPrice, uint _n) 
    internal
    returns (uint price) {
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
}

