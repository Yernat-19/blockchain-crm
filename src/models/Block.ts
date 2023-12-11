import {createHash} from 'node:crypto';

const SHA256 = message => createHash('sha256').update(message).digest('hex');

class Block {

  timestamp: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  hash: string;
  prevHash: string;
  nonce: number;
  

  constructor( data = {}) {

    this.timestamp = Date.now().toString();
    this.data = data;
    this.hash = this.getHash();
    this.prevHash = '';
    this.nonce = 0;
  }

  getHash() {
    return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
  }

  mine(difficulty) {
    while (!this.hash.startsWith(Array(difficulty + 1).join('0'))) {
      this.nonce++;
      this.hash = this.getHash();
    }
  }
}


export default Block;
