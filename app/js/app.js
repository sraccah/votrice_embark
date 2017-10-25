pragma solidity ^0.4.15;

/// @title Vote for the best DAPP
contract Votrice {

// voters structure
struct Voter {
    bool voted; // has voted ?
    uint vote; // index of the choice
}

// choices voters have
struct Choice {
    bytes32 name;
    uint count;
}

// chairperson for this ballot
address public chairperson;

// voters
mapping(address => Voter) public voters;
// choices
Choice[] public choices;

// constructor
function Votrice(bytes32[] choiceName) {
    chairperson = msg.sender;
    for (uint i = 0; i < choiceName.length; i++) {
        choices.push(Choice({
            name: choiceName[i],
            count
        }));
    }
}

// function to vote for someone
function vote(uint choice) {
    Voter storage sender = voters[msg.sender];
    require(!sender.voted);
    sender.voted = true;
    sender.vote = choice;
    choices[choice].count += 1;
}

// function to get the most voted choice
function winningChoice() constant returns (uint winningChoice) {
    uint winningCount = 0;
    for (uint j = 0; j < choices.length; j++) {
        if (choices[j].count > winningCount) {
            winningCount = choices[j].count;
            winningChoice = j;
        }
    }
}

// function to get the name of the winner
function winnerName() constant returns (bytes32 winnerName) {
        winnerName = choices[winningChoice()].name;
    }

}