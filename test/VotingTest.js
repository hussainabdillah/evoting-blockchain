const { expect } = require("chai");

describe("Voting Contract", function () {
  let Voting, voting, owner, addr1, addr2;

  beforeEach(async () => {
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1, addr2] = await ethers.getSigners();
    voting = await Voting.deploy();
    await voting.waitForDeployment();
  });

  it("Should allow a user to vote", async () => {
    await voting.connect(addr1).vote(1);
    const votes = await voting.getVotes(1);
    expect(votes).to.equal(1);
  });

  it("Should not allow a user to vote twice", async () => {
    await voting.connect(addr1).vote(2);
    await expect(voting.connect(addr1).vote(2)).to.be.revertedWith("You have already voted");
  });

  it("Should return correct vote count for multiple users", async () => {
    await voting.connect(addr1).vote(1);
    await voting.connect(addr2).vote(1);
    const votes = await voting.getVotes(1);
    expect(votes).to.equal(2);
  });

  it("Should track if address has voted", async () => {
    await voting.connect(addr1).vote(3);
    const hasVoted = await voting.hasAddressVoted(addr1.address);
    expect(hasVoted).to.be.true;
  });
});


describe("Voting Contract - Immutability Test", function () {
  let Voting, voting, owner, addr1;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1] = await ethers.getSigners();
    voting = await Voting.deploy();
    await voting.waitForDeployment();
  });

  it("Should not allow override vote and modification after submission", async function () {
    await voting.connect(addr1).vote(1);
    const votesAfter = await voting.getVotes(1);
    expect(votesAfter).to.equal(1);

    await expect(voting.connect(addr1).vote(2)).to.be.revertedWith("You have already voted");
    const votesFinal = await voting.getVotes(2);
    expect(votesFinal).to.equal(0);
  });

  it("Should not allow the contract owner (admin) to modify votes directly", async function () {
  await voting.connect(addr1).vote(2);
  const votes = await voting.getVotes(2);
  expect(votes).to.equal(1);

  try {
    await voting.setVotes(3);
    expect.fail("Expected setVotes to not exist, but it was called");
  } catch (error) {
    expect(error.message).to.include("voting.setVotes is not a function");
  }

  const stillVotes = await voting.getVotes(2);
  expect(stillVotes).to.equal(1);
});
});
