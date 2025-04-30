// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    address public owner;
    string[] public candidates;
    mapping(string => uint256) public votesReceived;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory _candidates) {
        owner = msg.sender;
        candidates = _candidates;
    }

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        bool validCandidate = false;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) {
                validCandidate = true;
                break;
            }
        }
        require(validCandidate, "Candidate not found.");
        hasVoted[msg.sender] = true;
        votesReceived[candidate]++;
    }

    function getTotalVotes(string memory candidate) public view returns (uint256) {
        return votesReceived[candidate];
    }

    function getAllCandidates() public view returns (string[] memory) {
        return candidates;
    }
}
