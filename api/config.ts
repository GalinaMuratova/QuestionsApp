import path from 'path';
import * as dotenv from 'dotenv';

const rootPath = __dirname;
dotenv.config();

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/questions',
};

export default config;