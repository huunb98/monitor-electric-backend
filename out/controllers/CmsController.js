"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsController = void 0;
const gateway_1 = require("../models/gateway");
const sensor_1 = require("../models/sensor");
const system_1 = require("../models/system");
class CmsController {
    createGateway(req, callback) {
        const { gatewayId, name, systemName, mqttStatus, mqttIp, mqttPort, config } = req.body;
        const gateway = new gateway_1.GatewayModel({
            gatewayId: gatewayId,
            name: name,
            systemName: systemName,
            mqttStatus: mqttStatus,
            mqttIp: mqttIp,
            mqttPort: mqttPort,
            config: config,
        });
        gateway
            .save()
            .then((_) => {
            callback(null, 'Create GateWay Succees');
        })
            .catch((error) => {
            console.log(error);
            callback(error.name, null);
        });
    }
    updateGateway() { }
    createSensor(req, callback) {
        const { sensorId, sensorName, description, operationMode, connectStatus, systemId, gatewayId, thresHold } = req.body;
        const newSensor = new sensor_1.SensorModel({
            sensorId: sensorId,
            sensorName: sensorName,
            description: description,
            operationMode: operationMode,
            connectStatus: connectStatus,
            systemId: systemId,
            gatewayId: gatewayId,
            thresHold: thresHold,
        });
        newSensor
            .save()
            .then((_) => {
            callback(null, 'Create Sucess');
        })
            .catch((error) => {
            console.log(error);
            callback(error.name, null);
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
            callback(error.name, null);
        });
    }
}
exports.cmsController = new CmsController();
//# sourceMappingURL=CmsController.js.map