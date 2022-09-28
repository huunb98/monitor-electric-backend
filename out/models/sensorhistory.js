"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorHistoryModel = void 0;
const mongoose = require("mongoose");
let sensorHistorySchema = new mongoose.Schema({
    sensorId: String,
    log: {
        type: Map,
        of: Object,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
});
exports.SensorHistoryModel = mongoose.model('SensorHistory', sensorHistorySchema);
//# sourceMappingURL=sensorhistory.js.map