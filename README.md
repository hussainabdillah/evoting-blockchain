# E-Voting Blockchain Project

A decentralized e-voting system built with Ethereum blockchain using Hardhat framework. This project implements a secure, transparent, and immutable voting system where each vote is recorded on the blockchain.

## 🏗️ Project Structure

```
evoting-blockchain/
├── contracts/                # Smart contracts
│   ├── Voting.sol            # Main voting contract
│   └── Lock.sol              # Sample Hardhat contract
├── scripts/                  # Deployment and utility scripts
│   ├── deploy.js             # Contract deployment script
│   ├── checkResults.js       # Vote results checker
│   └── listTransactions.js   # Transaction list viewer
├── test/                     # Test files
│   ├── VotingTest.js         # Smart contract unit tests
│   └── Lock.js               # Sample test file
├── artifacts/                # Compiled contracts (auto-generated)
├── cache/                    # Hardhat cache (auto-generated)
├── ignition/                 # Hardhat Ignition modules
├── hardhat.config.js         # Hardhat configuration
├── package.json              # Node.js dependencies
├── contract-address.json     # Deployed contract address (auto-generated)
└── .env                      # Environment variables (DO NOT COMMIT)
```

## 🔧 How It Works

The e-voting system operates on the following principles:

### Smart Contract Features
- **One Vote Per Address**: Each Ethereum address can only vote once
- **Transparent Counting**: All votes are publicly verifiable on the blockchain
- **Immutable Records**: Once cast, votes cannot be changed or deleted
- **Event Logging**: All voting activities are logged as blockchain events
- **Candidate System**: Voters can vote for candidates using numeric IDs

### Core Functions
1. `vote(uint256 candidateId)` - Cast a vote for a candidate
2. `getVotes(uint256 candidateId)` - Get vote count for a candidate
3. `hasAddressVoted(address addr)` - Check if an address has voted
4. `getTotalVotesCast()` - Get total number of votes cast

## 📁 File and Folder Explanation

### Smart Contracts (`/contracts/`)
- **`Voting.sol`**: Main voting contract implementing the e-voting logic
  - Manages vote counting and voter tracking
  - Prevents double voting
  - Emits events for vote transparency

### Scripts (`/scripts/`)
- **`deploy.js`**: Deploys the Voting contract to the blockchain
  - Saves contract address to `contract-address.json`
- **`checkResults.js`**: Analyzes voting results from blockchain events
  - Reads all "Voted" events and tallies results
- **`listTransactions.js`**: Lists all transactions in the local blockchain

### Tests (`/test/`)
- **`VotingTest.js`**: Comprehensive test suite for the Voting contract
  - Tests voting functionality
  - Tests double-voting prevention
  - Tests vote immutability

### Configuration Files
- **`hardhat.config.js`**: Hardhat framework configuration
  - Network settings (Sepolia testnet, localhost)
  - Etherscan API integration
- **`package.json`**: Node.js project configuration and dependencies
- **`.env`**: Environment variables (⚠️ Contains sensitive data)

## 🚀 Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **MetaMask** wallet extension
4. **Ethereum testnet ETH** (for Sepolia deployment)
5. **Alchemy API account** (for testnet connection)
6. **Etherscan API key** (for contract verification)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hussainabdillah/evoting-blockchain.git
   cd evoting-blockchain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in root directory
   touch .env
   ```

4. **Configure environment variables**
   Add the following to your `.env` file:
   ```env
   PRIVATE_KEY=your_wallet_private_key_here
   ALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key
   API_KEY=your_etherscan_api_key
   ```

   ⚠️ **Security Warning**: Never commit the `.env` file to version control!

## 🔧 How to Deploy and Run

### 1. Local Development

**Start local Hardhat network:**
```bash
npx hardhat node
```
This starts a local blockchain at `http://127.0.0.1:8545`

**Deploy to local network (in new terminal):**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 2. Testnet Deployment (Sepolia)

**Deploy to Sepolia testnet:**
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Verify contract on Etherscan:**
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

### 3. Testing

**Run all tests:**
```bash
npx hardhat test
```

**Run specific test:**
```bash
npx hardhat test test/VotingTest.js
```

### 4. Interaction Scripts

**Check voting results:**
```bash
npx hardhat run scripts/checkResults.js --network localhost
# or for testnet:
npx hardhat run scripts/checkResults.js --network sepolia
```

**List all transactions:**
```bash
npx hardhat run scripts/listTransactions.js --network localhost
```

## 🎯 Usage Examples

### Voting via Console

After deployment, you can interact with the contract:

```javascript
// Get contract instance
const contractAddress = "0x..."; // From contract-address.json
const Voting = await ethers.getContractAt("Voting", contractAddress);

// Cast a vote for candidate #1
await Voting.vote(1);

// Check votes for candidate #1
const votes = await Voting.getVotes(1);
console.log(`Candidate 1 has ${votes} votes`);

// Check if current address has voted
const hasVoted = await Voting.hasAddressVoted(signer.address);
console.log(`Has voted: ${hasVoted}`);
```

### Integration with Frontend

To integrate with a web frontend:

```javascript
// Contract ABI (from artifacts/contracts/Voting.sol/Voting.json)
const contractABI = [...];
const contractAddress = "0x...";

// Web3 integration
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Vote for candidate
async function vote(candidateId) {
    const tx = await contract.vote(candidateId);
    await tx.wait();
}

// Get results
async function getResults() {
    const events = await contract.queryFilter("Voted");
    // Process events to get vote counts
}
```

## 🧪 Available NPM Scripts

<!-- Currently available scripts in `package.json`:

```bash
npm test  # Run tests (currently just placeholder)
``` -->

**Currently available scripts in `package.json`**
```json
{
  "scripts": {
    "test": "npx hardhat test",
    "compile": "npx hardhat compile",
    "deploy:local": "npx hardhat run scripts/deploy.js --network localhost",
    "deploy:sepolia": "npx hardhat run scripts/deploy.js --network sepolia",
    "node": "npx hardhat node",
    "check-results": "npx hardhat run scripts/checkResults.js"
  }
}
```

## 🔐 Security Considerations

1. **Private Key Protection**: Never share or commit your private key
2. **Environment Variables**: Always use `.env` for sensitive data
3. **Gas Limits**: Set appropriate gas limits for transactions
4. **Contract Verification**: Verify contracts on Etherscan for transparency
5. **Testing**: Thoroughly test on testnet before mainnet deployment

## 🌐 Network Configuration

### Supported Networks

1. **Localhost** (`localhost`)
   - URL: `http://127.0.0.1:8545`
   - Use for local development and testing

2. **Sepolia Testnet** (`sepolia`)
   - URL: Alchemy API endpoint
   - Requires testnet ETH from faucets
   - Good for testing before mainnet

### Adding New Networks

Edit `hardhat.config.js` to add new networks:

```javascript
networks: {
  mainnet: {
    url: process.env.MAINNET_URL,
    accounts: [process.env.PRIVATE_KEY]
  },
  polygon: {
    url: process.env.POLYGON_URL,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **"You have already voted" error**
   - Each address can only vote once
   - Use different accounts for testing

2. **Network connection issues**
   - Check your Alchemy API URL
   - Ensure you have testnet ETH

3. **Contract not found**
   - Make sure the contract is deployed
   - Check `contract-address.json` for correct address

4. **Gas estimation failed**
   - Increase gas limit in transaction
   - Check account has sufficient ETH

### Getting Help

- Check Hardhat documentation: https://hardhat.org/docs
- Ethereum development resources: https://ethereum.org/developers
- Solidity documentation: https://docs.soliditylang.org

---

**⚠️ Important Security Notice**: This is an educational project. For production use, additional security audits and features (like candidate registration, voting periods, admin controls) should be implemented.
