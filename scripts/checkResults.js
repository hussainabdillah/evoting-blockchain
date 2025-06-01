const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // Baca address kontrak dari file
  const data = JSON.parse(fs.readFileSync("contract-address.json", "utf8"));
  const address = data.address;

  // Buat instance kontrak
  const Voting = await hre.ethers.getContractAt("Voting", address);
  const events = await Voting.queryFilter("Voted");
  const result = {};

  events.forEach((e) => {
    const candidate = e.args[1].toString();
    result[candidate] = (result[candidate] || 0) + 1;
  });

  console.log("📊 Hasil Voting dari Event:");
  Object.entries(result).forEach(([id, count]) => {
    console.log(`Kandidat ${id}: ${count} suara`);
  });

}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
