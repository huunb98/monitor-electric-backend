'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorModel = exports.ConnectStatus = exports.OperationMode = void 0;
const mongoose = require("mongoose");
var OperationMode;
(function (OperationMode) {
    OperationMode[OperationMode["Raw"] = 0] = "Raw";
    OperationMode[OperationMode["OnDemand"] = 1] = "OnDemand";
    OperationMode[OperationMode["Process"] = 2] = "Process";
})(OperationMode = exports.OperationMode || (exports.OperationMode = {}));
var ConnectStatus;
(function (ConnectStatus) {
    ConnectStatus[ConnectStatus["Active"] = 0] = "Active";
    ConnectStatus[ConnectStatus["DisconnectGatway"] = 1] = "DisconnectGatway";
    ConnectStatus[ConnectStatus["DisconnectInternet"] = 2] = "DisconnectInternet";
})(ConnectStatus = exports.ConnectStatus || (exports.ConnectStatus = {}));
let sensorSchema = new mongoose.Schema({
    SensorId: { type: String, require: true },
    SensorName: { type: String, require: true },
    Description: { type: String, require: false },
    OperationMode: OperationMode,
    ConnectStatus: {
        type: ConnectStatus,
        default: ConnectStatus.Active,
    },
    SystemId: { type: String, require: true, ref: 'System' },
    GatewayId: { type: String, require: true, ref: 'Gateway' },
    ThresHold: {
        type: Object,
        of: {
            Power: Number,
            Temp: Number,
            X: {
                RmsAcc: Number,
                RmsVel: Number,
                RmsDis: Number,
                MaxAcc: Number,
                FirstPeak: Number,
                SecondPeak: Number,
                ThirdPeak: Number,
            },
            Y: {
                RmsAcc: Number,
                RmsVel: Number,
                RmsDis: Number,
                MaxAcc: Number,
                FirstPeak: Number,
                SecondPeak: Number,
                ThirdPeak: Number,
            },
            Z: {
                RmsAcc: Number,
                RmsVel: Number,
                RmsDis: Number,
                MaxAcc: Number,
                FirstPeak: Number,
                SecondPeak: Number,
                ThirdPeak: Number,
            },
        },
    },
});
sensorSchema.index({ SensorId: 1 }, { sparse: true, background: true });
sensorSchema.index({ GatewayId: 1 });
sensorSchema.index({ SystemId: 1 });
sensorSchema.index({
    SensorName: 'text',
}, {
    sparse: true,
    background: true,
});
exports.SensorModel = mongoose.model('Sensor', sensorSchema);
//# sourceMappingURL=sensor.js.map