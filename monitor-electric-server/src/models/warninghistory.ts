import mongoose = require('mongoose');

export enum WarningCode {
  None = 0,
  OverTemp = 1,
  BatteryLow = 2,
  OverX = 3,
  OverY = 4,
  OverZ = 5,
}

export interface WarningHistory {
  sensorId: string;
  warningCode: WarningCode;
  warningMsg: string;
}

export interface IWarningHistoryDocument extends WarningHistory, mongoose.Document {}

let warningSchema = new mongoose.Schema(
  {
    sensorId: { type: String, require: true },
    warningCode: { type: Number, default: WarningCode.None },
    warningMsg: { type: String, require: true },
    timeStamp: { type: Date, default: Date.now },
  },
  { collection: 'WarningHistory' }
);

warningSchema.index({ sensorId: 1 });
warningSchema.index({ timeStamp: -1 });

export const WarningHistoryModel = mongoose.model<IWarningHistoryDocument>('WarningHistory', warningSchema);
