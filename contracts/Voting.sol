// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    mapping(uint256 => uint256) public votesReceived;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, uint256 indexed candidateId);

    function vote(uint256 candidateId) external {
        require(!hasVoted[msg.sender], "You have already voted");

        votesReceived[candidateId] += 1;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, candidateId);
    }

    function getVotes(uint256 candidateId) external view returns (uint256) {
        return votesReceived[candidateId];
    }

    function hasAddressVoted(address addr) external view returns (bool) {
        return hasVoted[addr];
    }
}
