"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceController = void 0;
const disconnect_1 = require("../config/disconnect");
const gateway_1 = require("../models/gateway");
const sensor_1 = require("../models/sensor");
const sendReport_1 = require("../services/mail/sendReport");
const messageController_1 = require("./messageController");
class DeviceControllter {
    checkStateGateway() {
        const now = Date.now();
        messageController_1.mapGateway.forEach((value, key) => {
            if (now - value.lastUpdate > disconnect_1.DisconectConfig.Gateway) {
                messageController_1.mapGateway.get(key).disconnectCount++;
                if (value.disconnectCount < 2)
                    this.changeStateGateway(key, gateway_1.GatewayStatus.Disconnect);
                if (value.disconnectCount === 10 || value.disconnectCount < 2) {
                    let msg = `Gateway ${key} disconected, check it now\n\nDeveloper Team`;
                    console.log(msg);
                    new sendReport_1.SendReport().sendMailReport('Gateway Disconect', msg, 'nguyenkhue2608@gmail.com', null);
                }
                if (value.disconnectCount > 20) {
                    messageController_1.mapGateway.delete(key);
                    console.log('delete cache gateway', key);
                }
            }
        });
    }
    checkStateSensor() {
        const now = Date.now();
        messageController_1.mapSensor.forEach((value, key) => {
            const gatewayState = now - messageController_1.mapGateway.get(value.gateway).lastUpdate < disconnect_1.DisconectConfig.Gateway;
            if (now - value.lastUpdate >= disconnect_1.DisconectConfig.Sensor && gatewayState) {
                messageController_1.mapSensor.get(key).disconnectCount++;
                // console.log('STATE SENSOR DISCONNECT ++');
                if (value.disconnectCount < 2)
                    this.changeConnectStateSensor(key, sensor_1.ConnectStatus.DisconnectGateway);
                if (value.disconnectCount === 10 || value.disconnectCount < 2) {
                    let msg = `Sensor ${key} disconected, check it now\n\nDeveloper Team`;
                    console.log(msg);
                    new sendReport_1.SendReport().sendMailReport('Sensor Disconect', msg, 'nguyenkhue2608@gmail.com', null);
                }
                if (value.disconnectCount > 20) {
                    messageController_1.mapSensor.delete(key);
                    console.log('delete cache sensor', key);
                }
            }
        });
    }
    changeStateGateway(id, mqttStatus) {
        gateway_1.GatewayModel.updateOne({ _id: id }, { $set: { mqttStatus: mqttStatus, connectStatus: mqttStatus } })
            .then((_) => console.log('Change State Gateway'))
            .catch((error) => console.log(error));
    }
    changeConnectStateSensor(id, state) {
        sensor_1.SensorModel.updateOne({ sensorId: id }, { $set: { connectStatus: state } })
            .then((_) => console.log('Change State Sensor'))
            .catch((error) => console.log(error));
    }
    changWarningSensor(id, code) {
        sensor_1.SensorModel.updateOne({ sensorId: id }, { $set: { warningCode: code } })
            .then((_) => console.log('Change State Sensor'))
            .catch((error) => console.log(error));
    }
}
exports.deviceController = new DeviceControllter();
//# sourceMappingURL=deviceController.js.map