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
    GatewayId: { type: String, require: true },
    Name: { type: String, require: true },
    Description: JSON,
    ConnectStatus: { type: GatewayStatus, default: GatewayStatus.Active },
    SystemId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'System' },
    MqttStatus: { type: Number, require: true },
    MqttIp: { type: Number, require: true },
    MqttPort: { type: Number, require: true },
    MqttTls: String,
    Config: {
        GatewayTopic: String,
        GatewayMsg: String,
        SensorTopic: String,
        SensorMsg: String,
    },
});
gatewaySchema.index({ GatewayId: 1 }, { sparse: true, background: true });
gatewaySchema.index({ SystemId: 1 });
exports.GatewayModel = mongoose.model('Gateway', gatewaySchema);
//# sourceMappingURL=gateway.js.map