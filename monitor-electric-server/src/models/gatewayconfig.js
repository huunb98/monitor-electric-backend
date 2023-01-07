'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayConfigModel = void 0;
const mongoose = require("mongoose");
const gatewayConfigSchema = new mongoose.Schema({
    mqttHost: String,
    mqttPort: Number,
    mqttTls: String,
    gatewayTopic: String,
    gatewayMsg: String,
    sensorTopic: String,
    sensorMsg: String,
}, { collection: 'GatewayConfig' });
exports.GatewayConfigModel = mongoose.model('GatewayConfig', gatewayConfigSchema);
//# sourceMappingURL=gatewayconfig.js.map