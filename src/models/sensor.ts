import mongoose = require('mongoose');
import { ISystemDocument } from './system';
import { WarningCode } from './warninghistory';

export enum OperationMode {
  Raw = 0,
  OnDemand = 1,
  Process = 2,
}
export enum ConnectStatus {
  Active = 0,
  DisconnectGateway = 1,
  DisconnectInternet = 2,
}

export interface ThresHoldStat {
  rmsAcc: number;
  rmsVel: number;
  rmsDis: number;
  maxAcc: number;
  firstPeak: number;
  secondPeak: number;
  thirdPeak: number;
}

export interface ThresHold {
  power: number;
  temp: number;
  x: ThresHoldStat;
  y: ThresHoldStat;
  z: ThresHoldStat;
}

export interface ISensor {
  sensorId: string;
  name: string;
  description: string;
  operationMode: OperationMode;
  connectStatus: ConnectStatus;
  warningCode: WarningCode;
  systemId: ISystemDocument;
  gatewayId: string;
  thresHold: ThresHold;
  createDate: Date;
}

export interface ISensorDocument extends ISensor, mongoose.Document {}

let sensorSchema = new mongoose.Schema(
  {
    _id: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: false },
    operationMode: { type: Number, require: true },
    connectStatus: { type: Number, default: ConnectStatus.Active },
    warningCode: { type: Number, default: WarningCode.None },
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
  },
  { collection: 'Sensor' }
);

sensorSchema.index({ gatewayId: 1 });

sensorSchema.index(
  {
    name: 'text',
  },
  {
    sparse: true,
    background: true,
  }
);

export const SensorModel = mongoose.model<ISensorDocument>('Sensor', sensorSchema);
