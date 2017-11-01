pragma solidity ^0.4.15;

/// @title Vote for the best DAPP
contract Votrice {

// voter structure
struct Voter {
    bool voted; // has voted ?
    uint vote; // index of the choice
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
// winners
uint[] public winners;

// constructor
function Votrice() public {
    creator = msg.sender;
    choices.length = 1;
}

//function to add contestants
function setChoices(uint len) public {
    choices.length = len;
}

// function to vote for someone
function vote(uint myChoice) public {
    Voter storage sender = voters[msg.sender];
    require(!sender.voted && myChoice <= choices.length && myChoice > 0);
    sender.voted = true;
    sender.vote = myChoice;
    choices[myChoice - 1].count += 1;
}

// function to check if the sender has voted
function didVote(address caller) public constant returns (bool hasVoted) {
    Voter memory sender = voters[caller];
    if (sender.voted == true) {
        return true;
    } else {
        return false;
    }
}

// function to get the most voted choice
function getWinningProject() public returns (uint[]) {
    uint winningCount = 0;
    for (uint i = 0; i < choices.length; i++) {
        if (choices[i].count == winningCount) {
            winners.push(i);
        }
        if (choices[i].count > winningCount) {
            winningCount = choices[i].count;
            winners = [i];
        }
    }
    return winners;
}
}