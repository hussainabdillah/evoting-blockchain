const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  console.log("✅ Voting deployed to:", await voting.getAddress());

  // Simpan address ke file
  fs.writeFileSync("contract-address.json", JSON.stringify({ address: await voting.getAddress() }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
