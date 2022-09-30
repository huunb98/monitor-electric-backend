require('dotenv').config({ path: __dirname + '/../.env' });

const mongoConfig = require('./services/database/mongodb');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

import { MessageBroker } from './controllers/MesageBroker';
import CmsRouter from './routes/cmsRouter';
import { InitConfig } from './services/database/initConfig';

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
  initConfig();
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

/**
 *  On listtenter message from topic
 */

async function initConfig() {
  const results = await new InitConfig().GetGateConfig();

  for (const index of results) {
    new MessageBroker(index).onMessageListener();
  }
}
