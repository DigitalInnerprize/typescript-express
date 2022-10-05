/* eslint-disable prefer-destructuring */
import 'dotenv/config';
import express, { Application } from 'express';
// import { connect } from './db/db';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import middlewares from './middlewares';

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

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

/* these routes need to be last for 404 and errorHandler */
app.use(middlewares.notFound);
app.use(middlewares.errorHandler)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
