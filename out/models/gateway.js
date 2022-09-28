'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModel = exports.GatewayStatus = void 0;
const mongoose = require("mongoose");
var GatewayStatus;
(function (GatewayStatus) {
    GatewayStatus[GatewayStatus["Active"] = 0] = "Active";
    GatewayStatus[GatewayStatus["Disconnect"] = 1] = "Disconnect";
})(GatewayStatus = exports.GatewayStatus || (exports.GatewayStatus = {}));
let gatewaySchema = new mongoose.Schema({
    gatewayId: { type: String, require: true },
    name: { type: String, require: true },
    systemName: String,
    description: Object,
    connectStatus: { type: Number, default: GatewayStatus.Active },
    systemId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'System' },
    mqttStatus: { type: Number, require: true },
    mqttIp: { type: Number, require: true },
    mqttPort: { type: Number, require: true },
    mqttTls: String,
    config: {
        gatewayTopic: String,
        gatewayMsg: String,
        sensorTopic: String,
        sensorMsg: String,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});
gatewaySchema.index({ gatewayId: 1 }, { sparse: true, background: true });
gatewaySchema.index({ systemId: 1 });
exports.GatewayModel = mongoose.model('Gateway', gatewaySchema);
//# sourceMappingURL=gateway.js.map