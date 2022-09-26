'use strict';

import mongoose = require('mongoose');
import { ISystemDocument } from './system';

export enum GatewayStatus {
  Active = 0,
  Disconnect = 1,
}

interface IGateway {
  GatewayId: string;
  Name: string;
  Description: JSON;
  ConnectStatus: GatewayStatus;
  SystemId: ISystemDocument;
  MqttStatus: number;
  MqttTls: string;
  Config: {
    GatewayTopic: string;
    GatewayMsg: string;
    SensorTopic: string;
    SensorMsg: string;
  };
}

export interface IGatewayDocument extends IGateway, mongoose.Document {}

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

export const GatewayModel = mongoose.model<IGatewayDocument>('Gateway', gatewaySchema);
