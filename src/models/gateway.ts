'use strict';

import mongoose = require('mongoose');
import { ISystemDocument } from './system';

export enum GatewayStatus {
  Active = 0,
  Disconnect = 1,
}

interface IGateway {
  gatewayId: string;
  name: string;
  systemName: string;
  description: Object;
  connectStatus: GatewayStatus;
  systemId: ISystemDocument;
  mqttStatus: number;
  mqttTls: string;
  config: {
    gatewayTopic: string;
    gatewayMsg: string;
    sensorTopic: string;
    sensorMsg: string;
  };
  createDate: Date;
}

export interface IGatewayDocument extends IGateway, mongoose.Document {}

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

export const GatewayModel = mongoose.model<IGatewayDocument>('Gateway', gatewaySchema);
