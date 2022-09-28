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
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const idResults_1 = require("../helpers/idResults");
const sensor_1 = require("../models/sensor");
class MessageController {
    getRawData(topic, payload) {
        const results = this.processTopic(topic);
        if (results.Sensor) {
        }
    }
    getThresHold(sensorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield sensor_1.SensorModel.findOne({ sensorId: sensorId }, { thresHold: 1 }).exec();
                return results.thresHold;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    processTopic(topic) {
        let list = topic.split('/');
        let result = new idResults_1.IdResult();
        if (list.length === 4) {
            result.Gateway = list[1];
            result.Sensor = list[3];
        }
        if (list.length === 2) {
            result.Gateway = list[1];
        }
        return result;
    }
}
exports.messageController = new MessageController();
//# sourceMappingURL=MessageControllter.js.map