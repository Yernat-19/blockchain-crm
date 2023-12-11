import Block from './Block';
import fs from 'fs';

const FILE_PATH = './dist/blockchain.json';
class Blockchain {

  chain: Array<Block>;
  difficulty: number = 1;

  constructor() {
    this.readFile();
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    block.prevHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);
    this.chain.push(block);
    this.writeToFile();
  }

  isValid() {
    
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
        return false;
      }
    }

    return true;
  }

  isValidHash(hash:string) {
    const currentBlockId = this.chain.findIndex(b => b.hash === hash);
    if((currentBlockId === -1)) {
      return false;
    }
    const currentBlock = this.chain[currentBlockId];
    const prevBlock = this.chain[currentBlockId-1];
    if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
      return false;
    }
    return true;
  }


  readFile() {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
  
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
        this.chain = jsonData.chain;
        this.difficulty = jsonData.difficulty;
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  writeToFile() {
    try {
      const jsonString = JSON.stringify(this, null, 2); // Convert JSON to string with indentation
      fs.writeFileSync(FILE_PATH, jsonString, 'utf8');
    } catch (error) {
      console.error('Error writing JSON to file:', error);
    }
  }
}


export default Blockchain;
