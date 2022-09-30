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
    description: Object,
    connectStatus: { type: Number, default: GatewayStatus.Active },
    systemId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'System' },
    systemName: String,
    mqttStatus: { type: Number, require: true },
    config: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'GatewayConfig' },
    createDate: {
        type: Date,
        default: Date.now,
    },
});
gatewaySchema.index({ gatewayId: 1 }, { sparse: true, background: true });
gatewaySchema.index({ systemId: 1 });
exports.GatewayModel = mongoose.model('Gateway', gatewaySchema);
//# sourceMappingURL=gateway.js.map