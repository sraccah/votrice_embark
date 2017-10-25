pragma solidity ^0.4.15;

/// @title Vote for the best DAPP
contract Votrice {

// voters structure
struct Voter {
    bool voted; // has voted ?
    uint vote; // index of the choice
}

// choices stucture
struct Choice {
    uint count; // number of votes for this project
}

// chairperson for this ballot
address public chairperson;
// voters
mapping(address => Voter) public voters;
// choices
Choice[] public choices;

// constructor
function Votrice(uint _numChoices) public {
    chairperson = msg.sender;
    choices.length = _numChoices;
}

// function to vote for someone
function vote(uint myChoice) public {
    Voter storage sender = voters[msg.sender];
    require(!sender.voted && myChoice <= choices.length);
    sender.voted = true;
    sender.vote = myChoice;
    choices[myChoice].count += 1;
}

// function to get the most voted choice
function getWinningChoice() public constant returns (uint winningChoice) {
    uint winningCount = 0;
    for (uint j = 0; j < choices.length; j++) {
        if (choices[j].count > winningCount) {
            winningCount = choices[j].count;
            winningChoice = j;
        }
    }
}

}