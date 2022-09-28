"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoConfig = require('./services/database/mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const app = express();
const MesageBroker_1 = require("./controllers/MesageBroker");
const CmsRouter_1 = __importDefault(require("./routes/CmsRouter"));
/**
 * On lisnter message from topic
 */
MesageBroker_1.messageBroker.onMessageListener();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
}));
app.use('/cms', CmsRouter_1.default);
mongoConfig.connect(process.env.MongoDBUrl, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Mongo Connected!');
}));
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
//# sourceMappingURL=index.js.map