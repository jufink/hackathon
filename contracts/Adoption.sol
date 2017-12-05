pragma solidity ^0.4.4;

contract Adoption {
    address[4] public adopters;

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 3);
        adopters[petId] = msg.sender;
        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public returns (address[4]) {
        return adopters;
    }
}