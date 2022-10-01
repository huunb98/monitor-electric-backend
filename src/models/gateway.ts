'use strict';

import mongoose = require('mongoose');
import { IGatewayConfigDocument } from './gatewayconfig';
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
  createDate: Date;
  config: IGatewayConfigDocument;
}

export interface IGatewayDocument extends IGateway, mongoose.Document {}

let gatewaySchema = new mongoose.Schema({
  _id: { type: String, require: true },
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

gatewaySchema.index({ systemId: 1 });

export const GatewayModel = mongoose.model<IGatewayDocument>('Gateway', gatewaySchema);
