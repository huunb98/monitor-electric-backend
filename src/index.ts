require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
import { Database } from './services/database/mongodb';
import CmsRouter from './routes/cmsRouter';
import { initSubTopic } from './services/database/initConfig';

const database = new Database();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
  })
);

app.use('/cms', CmsRouter);

database.connectMongoDb(async () => {
  console.log('Mongo Connected!');
  initSubTopic();
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
