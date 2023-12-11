import { Action, Body, Controller, Get,  OnUndefined, Post, UseInterceptor } from 'routing-controllers';
import 'reflect-metadata';
import BlockChain from '../models/Blockchain';
import Block from '../models/Block';
const blockchain: BlockChain = new BlockChain();
@Controller()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
@UseInterceptor(function (action: Action, content: any) {
  return content;
})
export class BlockChainController {
  @Get('/blockchain')
  init () {

    // application.locals.blockchain = blockchain;
    return blockchain;
  }

  @Get('/blockchain-list')
  get () {

    // application.locals.blockchain = blockchain;
    const uniqueToyNames = new Set(blockchain.chain.reverse().map(chain => chain.data.name));
    const uniqueToys = Array.from(uniqueToyNames).map(name => {
      // Find the first item with the given name (assuming names are unique)
      return blockchain.chain.find(chain => chain.data.name === name);
    });
    return uniqueToys;
  }

  @Post('/blockchain/add')
  @OnUndefined(204)
  add (
    @Body() 
      data: object
  ) {
    console.log(JSON.stringify(data));
    const block = new Block(data);
    blockchain.addBlock(block);
    return blockchain;
  }

  @Get('/blockchain/check')
  @OnUndefined(204)
  check () {
    return blockchain.isValid();
  }

  @Post('/blockchain/check')
  @OnUndefined(204)
  checkExact (
    @Body() 
      hash: string
  ) {
    return blockchain.isValidHash(hash);
  }
}