import {  useExpressServer } from 'routing-controllers';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express, {Express} from 'express';
import httpContext from 'express-http-context';
import { GlobalErrorHandler } from './middleware/global-error-handler';
import { BlockChainController } from './controller/blochain-controller';
// import log4js from 'log4js';

dotenv.config();
// const logger = log4js.getLogger();
// logger.level = process.env.LOG_LEVEL;
// logger.info('Info log for example');
const port = process.env.PORT;
const app: Express = express();
app.use(bodyParser.json());
app.use(httpContext.middleware);
useExpressServer(app, {
  controllers: [ BlockChainController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});
// app.locals.blockchain = null;

app.listen(port, () => console.log(`Running on port ${port}`));