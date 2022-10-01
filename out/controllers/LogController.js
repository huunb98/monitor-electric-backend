"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logController = void 0;
const warninghistory_1 = require("../models/warninghistory");
const sensorhistory_1 = require("../models/sensorhistory");
class LogController {
    logSensor(sensor, log) {
        const sensorHistory = new sensorhistory_1.SensorHistoryModel({
            sensorId: sensor,
            log: log,
        });
        sensorHistory
            .save()
            .then((_) => console.log('save sensor history succeed'))
            .catch((_) => console.log('save sensor history error'));
    }
    logWarning(sensorId, warningCode, msg) {
        const warningHistory = new warninghistory_1.WarningHistoryModel({
            sensorId: sensorId,
            warningCode: warningCode,
            warningMsg: msg,
        });
        warningHistory
            .save()
            .then((_) => console.log('save warning history succeed'))
            .catch((_) => console.log('save warning history error'));
    }
}
exports.logController = new LogController();
//# sourceMappingURL=logController.js.map