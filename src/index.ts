require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
import http = require('http');
import socketIO = require('socket.io');

import { Database } from './services/database/mongodb';
import CmsRouter from './routes/cmsRouters';
import { initSubTopic } from './services/database/initConfig';

let httpServer = new http.Server(app);
let io = socketIO(httpServer, {
  transports: ['websocket'],
});

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

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});

httpServer.listen(1168, function () {
  console.log('listening on *:1168');
});

io.sockets.on('connection', (socket) => {
  console.log('Client connected id ' + socket.id);

  setTimeout(() => {
    socket.emit('message', 'sensor 1 disconnected');
  }, 3000);

  socket.on('disconnected', () => {
    socket.disconnected();
  });
});
