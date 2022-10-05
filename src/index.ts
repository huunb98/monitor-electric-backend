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
import { eventService } from './services/event/event';

let httpServer = new http.Server(app);
let io = socketIO(httpServer, {
  transports: ['websocket'],
});

const database = new Database();
const socketPort = process.env.SocketPort;
const httpPort = process.env.HttpPort;

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

/**
 * Listener warning for notify web
 */

eventService.onWarning(io);

app.listen(httpPort, () => {
  console.log('Http listening on port', httpPort);
});

httpServer.listen(socketPort, function () {
  console.log('Socket listening on port', socketPort);
});

io.sockets.on('connection', (socket) => {
  console.log('Client connected id ' + socket.id);

  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
    socket.disconnect();
  });
});
