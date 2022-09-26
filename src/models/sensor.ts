'use strict';

import mongoose = require('mongoose');

export enum OperationMode {
  Raw = 0,
  OnDemand = 1,
  Process = 2,
}
export enum ConnectStatus {
  Active = 0,
  DisconnectGatway = 1,
  DisconnectInternet = 2,
}

export interface ThresHoldStat {
  RmsAcc: number;
  RmsVel: number;
  RmsDis: number;
  MaxAcc: number;
  FirstPeak: number;
  SecondPeak: number;
  ThirdPeak: number;
}

export interface ThresHold {
  Power: number;
  Temp: number;
  X: ThresHoldStat;
  Y: ThresHoldStat;
  Z: ThresHoldStat;
}

export interface ISensor {
  SensorId: string;
  Name: string;
  Description: string;
  OperationMode: OperationMode;
  ConnectStatus: ConnectStatus;
  SystemId: string;
  GatewayId: string;
  ThresHold: ThresHold;
}

export interface ISensorDocument extends ISensor, mongoose.Document {}

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

sensorSchema.index(
  {
    SensorName: 'text',
  },
  {
    sparse: true,
    background: true,
  }
);

export const SensorModel = mongoose.model<ISensorDocument>('Sensor', sensorSchema);
