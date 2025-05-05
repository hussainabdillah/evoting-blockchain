// scripts/listTransactions.js

async function main() {
    const hre = require("hardhat")
    const provider = hre.ethers.provider
  
    const latestBlockNumber = await provider.getBlockNumber()
    console.log(`📦 Fetching transactions from block 0 to ${latestBlockNumber}\n`)
  
    for (let i = 0; i <= latestBlockNumber; i++) {
      const block = await provider.getBlock(i)
  
      if (block && block.transactions.length > 0) {
        console.log(`🔹 Block ${block.number} | Hash: ${block.hash}`)
        for (const tx of block.transactions) {
          console.log(`  ↳ TxHash: ${tx.hash}`)
          console.log(`     From: ${tx.from}`)
          console.log(`       To: ${tx.to}`)
          console.log(`    Value: ${hre.ethers.utils.formatEther(tx.value)} ETH`)
          console.log("")
        }
      }
    }
  
    console.log("✅ Done")
  }
  
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  