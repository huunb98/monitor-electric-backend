'use strict';

import mongoose = require('mongoose');

interface IGatewayConfig {
  mqttHost: string;
  mqttPort: number;
  mqttTls: string;
  gatewayTopic: string;
  gatewayMsg: string;
  sensorTopic: string;
  sensorMsg: string;
}

export interface IGatewayConfigDocument extends IGatewayConfig, mongoose.Document {}

const gatewayConfigSchema = new mongoose.Schema(
  {
    mqttHost: String,
    mqttPort: Number,
    mqttTls: String,
    gatewayTopic: String,
    gatewayMsg: String,
    sensorTopic: String,
    sensorMsg: String,
  },
  { collection: 'GatewayConfig' }
);

export const GatewayConfigModel = mongoose.model<IGatewayConfigDocument>('GatewayConfig', gatewayConfigSchema);
