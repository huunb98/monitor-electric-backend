'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningHistorySchema = void 0;
const mongoose = require("mongoose");
let sensorHistorySchema = new mongoose.Schema({
    SensorId: String,
    Log: {
        type: Map,
        of: Object,
    },
    TimeStamp: {
        type: Date,
        default: Date.now,
    },
});
exports.WarningHistorySchema = mongoose.model('SensorHistory', sensorHistorySchema);
//# sourceMappingURL=sensorhistory.js.map