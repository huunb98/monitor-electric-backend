"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorModel = exports.ConnectStatus = exports.OperationMode = void 0;
const mongoose = require("mongoose");
const warninghistory_1 = require("./warninghistory");
var OperationMode;
(function (OperationMode) {
    OperationMode[OperationMode["Raw"] = 0] = "Raw";
    OperationMode[OperationMode["OnDemand"] = 1] = "OnDemand";
    OperationMode[OperationMode["Process"] = 2] = "Process";
})(OperationMode = exports.OperationMode || (exports.OperationMode = {}));
var ConnectStatus;
(function (ConnectStatus) {
    ConnectStatus[ConnectStatus["Active"] = 0] = "Active";
    ConnectStatus[ConnectStatus["DisconnectGateway"] = 1] = "DisconnectGateway";
    ConnectStatus[ConnectStatus["DisconnectInternet"] = 2] = "DisconnectInternet";
})(ConnectStatus = exports.ConnectStatus || (exports.ConnectStatus = {}));
let sensorSchema = new mongoose.Schema({
    _id: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: false },
    operationMode: { type: Number, require: true },
    connectStatus: { type: Number, default: ConnectStatus.Active },
    warningCode: { type: Number, default: warninghistory_1.WarningCode.None },
    systemId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'System' },
    gatewayId: { type: String, require: true },
    systemName: String,
    gatewayName: String,
    thresHold: {
        type: Object,
        of: {
            power: Number,
            temp: Number,
            x: {
                rmsAcc: Number,
                rmsVel: Number,
                rmsDis: Number,
                maxAcc: Number,
                firstPeak: Number,
                secondPeak: Number,
                thirdPeak: Number,
            },
            y: {
                rmsAcc: Number,
                rmsVel: Number,
                rmsDis: Number,
                maxAcc: Number,
                firstPeak: Number,
                secondPeak: Number,
                thirdPeak: Number,
            },
            z: {
                rmsAcc: Number,
                rmsVel: Number,
                rmsDis: Number,
                maxAcc: Number,
                firstPeak: Number,
                secondPeak: Number,
                thirdPeak: Number,
            },
        },
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'Sensor' });
sensorSchema.index({ gatewayId: 1 });
sensorSchema.index({
    name: 'text',
}, {
    unique: true,
    sparse: true,
    background: true,
});
exports.SensorModel = mongoose.model('Sensor', sensorSchema);
//# sourceMappingURL=sensor.js.map