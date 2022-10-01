require('dotenv').config({ path: __dirname + '/../.env' });

const mongoConfig = require('./services/database/mongodb');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

import CmsRouter from './routes/cmsRouter';
import { initSubTopic } from './services/database/initConfig';

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
  })
);

app.use('/cms', CmsRouter);

mongoConfig.connect(process.env.MongoDBUrl, async () => {
  console.log('Mongo Connected!');
  initSubTopic();
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
