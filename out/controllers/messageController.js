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
exports.messageController = exports.mapSensor = exports.mapGateway = void 0;
const idResults_1 = require("../helpers/idResults");
const sensor_1 = require("../models/sensor");
const logControllers_1 = require("./logControllers");
const initConfig_1 = require("../services/database/initConfig");
const msgReportResults_1 = require("../helpers/msgReportResults");
const messageWarning_1 = require("../config/messageWarning");
const warninghistory_1 = require("../models/warninghistory");
const sendReport_1 = require("../services/mail/sendReport");
const checkState_1 = require("../helpers/checkState");
const scheduleJobController_1 = require("./scheduleJobController");
const deviceController_1 = require("./deviceController");
const gateway_1 = require("../models/gateway");
const notify_1 = require("../config/notify");
const event_1 = require("../services/event/event");
const sendReport = new sendReport_1.SendReport();
exports.mapGateway = new Map();
exports.mapSensor = new Map();
let setWarningSensor = new Set();
class MessageController {
    constructor() {
        this.checkStateDevice();
    }
    getRawData(topic, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const msgReportResults = yield this.getSensorAndMsg(topic, payload);
            if (msgReportResults)
                this.processMessage(msgReportResults);
        });
    }
    getSensorAndMsg(topic, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let msg = new msgReportResults_1.MessageReportResults();
                let data = JSON.parse(payload);
                let key = Object.keys(data)[0];
                logControllers_1.logController.logSensor(key, data[key]);
                const gateway = topic.split('/')[1];
                this.updateDevice(gateway, key);
                const result = data[key];
                msg.sensorId = key;
                msg.power = result.battery_level;
                msg.temp = result.temperature;
                msg.x_rms_ACC_mg = result.x_rms_ACC_mg;
                msg.x_max_ACC_mg = result.x_max_ACC_mg;
                msg.x_velocity_mm_sec = result.x_velocity_mm_sec;
                msg.x_displacement_mm = result.x_displacement_mm;
                msg.x_peak_one_Hz = result.x_peak_one_Hz;
                msg.x_peak_two_Hz = result.x_peak_two_Hz;
                msg.x_peak_three_Hz = result.x_peak_three_Hz;
                msg.y_rms_ACC_mg = result.y_rms_ACC_mg;
                msg.y_max_ACC_mg = result.y_max_ACC_mg;
                msg.y_velocity_mm_sec = result.y_velocity_mm_sec;
                msg.y_displacement_mm = result.y_displacement_mm;
                msg.y_peak_one_Hz = result.y_peak_one_Hz;
                msg.y_peak_two_Hz = result.y_peak_two_Hz;
                msg.y_peak_three_Hz = result.y_peak_three_Hz;
                msg.z_rms_ACC_mg = result.z_rms_ACC_mg;
                msg.z_max_ACC_mg = result.z_max_ACC_mg;
                msg.z_velocity_mm_sec = result.z_velocity_mm_sec;
                msg.z_displacement_mm = result.z_displacement_mm;
                msg.z_peak_one_Hz = result.z_peak_one_Hz;
                msg.z_peak_two_Hz = result.z_peak_two_Hz;
                msg.z_peak_three_Hz = result.z_peak_three_Hz;
                return Promise.resolve(msg);
            }
            catch (error) {
                console.log(error);
                return Promise.resolve(null);
            }
        });
    }
    updateDevice(gateway, sensor) {
        try {
            if (exports.mapGateway.has(gateway)) {
                exports.mapGateway.get(gateway).lastUpdate = Date.now();
                exports.mapGateway.get(gateway).sensor.add(sensor);
                if (exports.mapGateway.get(gateway).disconnectCount) {
                    exports.mapGateway.get(gateway).disconnectCount = 0;
                    deviceController_1.deviceController.changeStateGateway(gateway, gateway_1.GatewayStatus.Active);
                }
            }
            else {
                let gt = new checkState_1.MapGateway();
                gt.lastUpdate = Date.now();
                gt.sensor.add(sensor);
                exports.mapGateway.set(gateway, gt);
                deviceController_1.deviceController.changeStateGateway(gateway, gateway_1.GatewayStatus.Active);
            }
            if (exports.mapSensor.has(sensor)) {
                exports.mapSensor.get(sensor).lastUpdate = Date.now();
                if (exports.mapSensor.get(sensor).disconnectCount) {
                    exports.mapSensor.get(sensor).disconnectCount = 0;
                    deviceController_1.deviceController.changeConnectStateSensor(sensor, sensor_1.ConnectStatus.Active);
                }
                exports.mapSensor.get(sensor).disconnectCount = 0;
            }
            else {
                let ss = new checkState_1.MapSensor();
                ss.lastUpdate = Date.now();
                ss.gateway = gateway;
                exports.mapSensor.set(sensor, ss);
                deviceController_1.deviceController.changeConnectStateSensor(sensor, sensor_1.ConnectStatus.Active);
            }
        }
        catch (error) {
            console.log('-- update device error --', error);
        }
    }
    /**
     * Cảnh báo khi thiết bị vượt ngưỡng
     * Chỉ cảnh báo lần đầu vượt ngưỡng - trước đó hoạt động bình thường
     * @param msg
     */
    processMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const thresHold = yield this.getThresHold(msg.sensorId);
            if (thresHold) {
                let sensorId = msg.sensorId;
                let rs = '';
                let warningCode = warninghistory_1.WarningCode.None;
                if (msg.power < thresHold.power) {
                    rs += messageWarning_1.MsgWarning.power + ': ' + msg.power + ' - ' + `${(msg.power / thresHold.power).toFixed(2)}%` + '\n';
                    warningCode = warninghistory_1.WarningCode.BatteryLow;
                }
                if (msg.temp > thresHold.temp) {
                    rs += messageWarning_1.MsgWarning.temp + ': ' + msg.temp + '\n';
                    warningCode = warninghistory_1.WarningCode.OverTemp;
                }
                if (msg.x_rms_ACC_mg > thresHold.x.rmsAcc ||
                    msg.x_max_ACC_mg > thresHold.x.maxAcc ||
                    msg.x_velocity_mm_sec > thresHold.x.rmsVel ||
                    msg.x_displacement_mm > thresHold.x.rmsDis ||
                    msg.x_peak_one_Hz > thresHold.x.firstPeak ||
                    msg.x_peak_two_Hz > thresHold.x.secondPeak ||
                    msg.x_peak_three_Hz > thresHold.x.thirdPeak) {
                    rs += messageWarning_1.MsgWarning.x_rms_ACC_mg + '\n';
                    warningCode = warninghistory_1.WarningCode.OverX;
                }
                if (msg.y_rms_ACC_mg > thresHold.y.rmsAcc ||
                    msg.y_max_ACC_mg > thresHold.y.maxAcc ||
                    msg.y_velocity_mm_sec > thresHold.y.rmsVel ||
                    msg.y_displacement_mm > thresHold.y.rmsDis ||
                    msg.y_peak_one_Hz > thresHold.y.firstPeak ||
                    msg.y_peak_two_Hz > thresHold.y.secondPeak ||
                    msg.y_peak_three_Hz > thresHold.y.thirdPeak) {
                    rs += messageWarning_1.MsgWarning.y_rms_ACC_mg + '\n';
                    warningCode = warninghistory_1.WarningCode.OverY;
                }
                if (msg.z_rms_ACC_mg > thresHold.z.rmsAcc ||
                    msg.z_max_ACC_mg > thresHold.z.maxAcc ||
                    msg.z_velocity_mm_sec > thresHold.z.rmsVel ||
                    msg.z_displacement_mm > thresHold.z.rmsDis ||
                    msg.z_peak_one_Hz > thresHold.z.firstPeak ||
                    msg.z_peak_two_Hz > thresHold.z.secondPeak ||
                    msg.z_peak_three_Hz > thresHold.z.thirdPeak) {
                    rs += messageWarning_1.MsgWarning.z_rms_ACC_mg + '\n';
                    warningCode = warninghistory_1.WarningCode.OverZ;
                }
                //  console.log(rs);
                if (rs) {
                    logControllers_1.logController.logWarning(sensorId, warningCode, rs);
                    let text = 'Hi Admin, \n';
                    text += `System active not right - Sensor ${sensorId} detected \n`;
                    text += rs;
                    text += '\nDeveloper Team';
                    if (!setWarningSensor.has(sensorId)) {
                        sendReport.sendMailReport('Sensor Warning', text, 'nguyenkhue2608@gmail.com', null);
                        let notify = new notify_1.NotifyWarning();
                        notify.sensorId = sensorId;
                        notify.warningCode = warningCode;
                        event_1.eventService.emitwarning(notify);
                    }
                    setWarningSensor.add(sensorId);
                }
                else
                    setWarningSensor.delete(sensorId);
                deviceController_1.deviceController.changWarningSensor(sensorId, warningCode);
            }
        });
    }
    getThresHold(sensorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield sensor_1.SensorModel.findOne({ _id: sensorId }, { thresHold: 1 }).exec();
                if (results)
                    return results.thresHold;
                else
                    return null;
            }
            catch (error) {
                console.log(error);
                return null;
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
    reloadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('----- Reload Config -----');
            initConfig_1.mapBroker.forEach((value, key) => {
                value.disconnect();
                initConfig_1.mapBroker.delete(key);
            });
            setTimeout(() => {
                (0, initConfig_1.initSubTopic)();
            }, 3000);
        });
    }
    /**
     * Job check state device
     */
    checkStateDevice() {
        scheduleJobController_1.scheduleJobControllter.checkGateway();
        scheduleJobController_1.scheduleJobControllter.checkSensor();
    }
}
exports.messageController = new MessageController();
//# sourceMappingURL=messageController.js.map