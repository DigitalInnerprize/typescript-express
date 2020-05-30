import Mongoose from 'mongoose';
import { log } from '../utils/logger';
let database: Mongoose.Connection;

export const connect = () => {
  // add your own uri below
  const uri = `${process.env.MONGO_URI}`;
  if (database) {
    return;
  }
  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = Mongoose.connection;
  database.once('open', async () => {
    log.info('Connected to database');
  });
  database.on('error', () => {
    log.error('Error connecting to database');
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
