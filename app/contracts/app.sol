pragma solidity ^0.4.15;

/// @title Vote for the best DAPP
contract Votrice {

// voter structure
struct Voter {
    bool voted; // has voted ?
    uint8 vote; // index of the choice
}

// project stucture
struct Project {
    uint count; // number of votes for this project
}

// creator of the contract
address public creator;
// voters
mapping(address => Voter) public voters;
// choices
Project[] public choices;

// constructor
function Votrice() public {
    creator = msg.sender;
    choices.length = 1;
}

//function to add contestants
function setChoices(uint8 nbr) {
    choices.length = nbr;
}

// function to vote for someone
function vote(uint8 myChoice) public {
    Voter storage sender = voters[msg.sender];
    require(!sender.voted && myChoice <= choices.length);
    sender.voted = false;
    sender.vote = myChoice;
    choices[myChoice].count += 1;
}

// function to get the most voted choice
function getWinningChoice() public constant returns (uint8 winningChoice) {
    uint256 winningCount = 0;
    for (uint8 j = 0; j < choices.length; j++) {
        if (choices[j].count > winningCount) {
            winningCount = choices[j].count;
            winningChoice = j;
        }
    }
}
}