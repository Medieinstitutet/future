import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';
import Transaction from './Transaction.mjs';
import FileHandler from '../utilities/filehandler.mjs';
import CryptoCurrency from './cryptoCurrency.mjs';
export default class Blockchain {
  constructor() {
    this.fileHandler = new FileHandler('data', 'blockchain.json');
    const data = this.fileHandler.read(true);
    console.log('Loaded Blockchain Data:', data)
    
    if (data && Object.keys(data).length > 0 && data.chain && data.chain.length > 0) {
      this.chain = data.chain;
      this.pendingTransactions = data.pendingTransactions || [];
      this.memberNodes = data.memberNodes || [];
      this.nodeUrl = data.nodeUrl || process.argv[3];
    } else {
      this.chain = [];
      this.pendingTransactions = [];
      this.memberNodes = [];
      this.nodeUrl = process.argv[3];
      this.createGenesisBlock();
    }
    this.cryptoCurrency = new CryptoCurrency('data', 'accounts.json');
    console.log('Blockchain Initialized:', this);
  }
  createGenesisBlock() {
    this.createBlock(Date.now(), '0', '0', [], 2048, 1);
  }

  createBlock(
    timestamp,
    previousBlockHash,
    currentBlockHash,
    data,
    nonce,
    difficulty
  ) {
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data,
      nonce,
      difficulty
    );

    this.pendingTransactions = [];
    this.chain.push(block);
    this.saveBlockchain();
    return block;

  }

  createTransaction(amount, sender, recipient, ticketID, firstName, lastName, email) {
    return new Transaction(amount, sender, recipient, ticketID, firstName, lastName, email);
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
    this.cryptoCurrency.transferFunds(transaction.sender, transaction.recipient, transaction.amount); 
    this.saveBlockchain();
    return this.getLastBlock().blockIndex + 1;
  }

  getLastBlock() {
    return this.chain.at(-1);
  }
  saveBlockchain() {
    const data = {
      chain: this.chain,
      pendingTransactions: this.pendingTransactions,
      memberNodes: this.memberNodes,
      nodeUrl: this.nodeUrl
    };
    this.fileHandler.write(data);
  }

  hashBlock(timestamp, previousBlockHash, currentBlockData, nonce, difficulty) {
    const stringToHash =
      timestamp.toString() +
      previousBlockHash +
      JSON.stringify(currentBlockData) +
      nonce +
      difficulty;
    const hash = createHash(stringToHash);

    return hash;
  }

  validateChain(blockchain) {
    let isValid = true;

    // Gå igenom varje block i kedjan och validera dem.
    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];

      const previousBlock = blockchain[i - 1];

      const hash = this.hashBlock(
        block.timestamp,
        previousBlock.currentBlockHash,
        block.data
      );

      if (hash !== block.currentBlockHash) isValid = false;
      if (block.previousBlockHash !== previousBlock.currentBlockHash)
        isValid = false;
    }

    return isValid;
  }

  proofOfWork(previousBlockHash, data) {
    const lastBlock = this.getLastBlock();
    let difficulty, hash, timestamp;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();

      difficulty = this.difficultyAdjustment(lastBlock, timestamp);
      hash = this.hashBlock(
        timestamp,
        previousBlockHash,
        data,
        nonce,
        difficulty
      );
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return { nonce, difficulty, timestamp };
  }

  difficultyAdjustment(lastBlock, timestamp) {
    const MINE_RATE = process.env.MINE_RATE;
    let { difficulty } = lastBlock;

    if (difficulty < 1) return 1;

    return timestamp - lastBlock.timestamp > MINE_RATE
      ? +difficulty + 1
      : +difficulty - 1;
  }
}
