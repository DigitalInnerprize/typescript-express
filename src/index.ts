/* eslint-disable prefer-destructuring */
import 'dotenv/config';
import { log } from './utils/logger';
import express, { Application } from 'express';
import { connect } from './db/db';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app: Application = express();

const port = process.env.PORT || process.env.DOCKER_NODE_PORT || 4000;

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  }),
);
app.use(express.json());

(async () => {
  await connect();
  app.listen(port, () => {
    log.info(`Listening at http://localhost:${port}`);
  });
})();
