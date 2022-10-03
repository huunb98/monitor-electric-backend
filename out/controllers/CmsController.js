"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsController = void 0;
const gateway_1 = require("../models/gateway");
const sensor_1 = require("../models/sensor");
const system_1 = require("../models/system");
const gatewayconfig_1 = require("../models/gatewayconfig");
const mongoose = require("mongoose");
const messageController_1 = require("./messageController");
class CmsController {
    createGateway(req, callback) {
        const { gatewayId, name, systemName, systemId, mqttStatus, description, config } = req.body;
        const gateway = new gateway_1.GatewayModel({
            _id: gatewayId,
            name: name,
            description: description,
            systemId: new mongoose.Types.ObjectId(systemId),
            systemName: systemName,
            mqttStatus: +mqttStatus,
            config: new mongoose.Types.ObjectId(config),
        });
        gateway
            .save()
            .then((_) => {
            callback(null, 'Create GateWay Succees');
        })
            .catch((error) => {
            console.log(error);
            callback('MongoServerError: code ' + error.code, null);
        });
    }
    updateGateway() { }
    createSensor(req, callback) {
        const { sensorId, name, description, operationMode, connectStatus, systemId, gatewayId, thresHold, systemName, gatewayName } = req.body;
        const newSensor = new sensor_1.SensorModel({
            _id: sensorId,
            name: name,
            description: description,
            operationMode: operationMode,
            connectStatus: connectStatus,
            systemId: new mongoose.Types.ObjectId(systemId),
            gatewayId: gatewayId,
            systemName: systemName,
            gatewayName: gatewayName,
            thresHold: thresHold,
        });
        newSensor
            .save()
            .then((_) => {
            callback(null, 'Create Sucess');
        })
            .catch((error) => {
            console.log(error);
            callback('MongoServerError: code ' + error.code, null);
        });
    }
    updateSensor(req, callback) { }
    createSystem(req, callback) {
        const { name, description } = req.body;
        const newSystem = new system_1.SystemModel({
            name: name,
            description: description,
        });
        newSystem
            .save()
            .then((_) => callback(null, 'Create System Succeed'))
            .catch((error) => {
            console.log(error);
            callback('MongoServerError: code ' + error.code, null);
        });
    }
    createGatewayConfig(req, callback) {
        const { mqttProtocol, mqttHost, mqttPort, mqttTls, gatewayTopic, gatewayMsg, sensorTopic, sensorMsg } = req.body;
        const newConfig = new gatewayconfig_1.GatewayConfigModel({
            mqttProtocol: mqttProtocol,
            mqttHost: mqttHost,
            mqttPort: Number(mqttPort),
            mqttTls: mqttTls,
            gatewayTopic: gatewayTopic,
            gatewayMsg: gatewayMsg,
            sensorTopic: sensorTopic,
            sensorMsg: sensorMsg,
        });
        newConfig
            .save()
            .then((_) => {
            callback(null, 'Create Config Succeed');
            messageController_1.messageController.reloadConfig();
        })
            .catch((error) => {
            console.log(error);
            callback('MongoServerError: code ' + error.code, null);
        });
    }
    reloadConfig(callback) {
        messageController_1.messageController.reloadConfig();
        callback(null, 'Reload Config Succeed');
    }
}
exports.cmsController = new CmsController();
//# sourceMappingURL=cmsController.js.map