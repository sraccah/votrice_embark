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
function setChoices(uint8 len) public {
    choices.length = len;
}

// function to vote for someone
function vote(uint8 myChoice) public {
    Voter storage sender = voters[msg.sender];
    require(!sender.voted && myChoice <= choices.length && myChoice > 0);
    sender.voted = true;
    sender.vote = myChoice;
    choices[myChoice].count += 1;
}

// function to check if the sender has voted
function didVote() public constant returns (bool hasVoted) {
    Voter memory sender = voters[msg.sender];
    if (sender.voted == true) {
        return true;
    } else {
        return false;
    }
}

// function to get the most voted choice
function getWinningProject() public constant returns (uint8 winningProject) {
    uint256 winningCount = 0;
    for (uint8 j = 0; j < choices.length; j++) {
        if (choices[j].count > winningCount) {
            winningCount = choices[j].count;
            winningProject = j;
        }
    }
}
}