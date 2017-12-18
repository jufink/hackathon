pragma solidity ^0.4.4;

contract Fashion {
    address[9] public renter;

    function rent(uint bag) public returns (uint) {
        require(bag >= 0 && bag <= 8);
        renter[bag] = msg.sender;
        return bag;
    }

     function rent_back(uint bag) public returns (uint) {
        require(bag >= 0 && bag <= 8);
        address default_addr = 0x0000000000000000000000000000000000000000;
        renter[bag] = default_addr;
        return bag;
    }

    function getRenters() public returns (address[9]) {
        return renter;
    }
}