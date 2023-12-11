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

  @Post('/blockchain/add')
  @OnUndefined(204)
  add (
    @Body() 
      data: Array<unknown>
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