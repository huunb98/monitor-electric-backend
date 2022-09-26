'use strict';

import mongoose = require('mongoose');

export enum WarningCode {
  None = 0,
  OverTemp = 1,
  OverX = 2,
  OverY = 3,
  OverZ = 4,
}

export interface WarningHistory {
  Sensor: string;
  WarningCode: WarningCode;
  WarningMsg: string;
}

export interface IWarningHistoryDocument extends WarningHistory, mongoose.Document {}

let warningSchema = new mongoose.Schema({
  Sensor: { type: String, require: true },
  WarningCode: { type: WarningCode, default: WarningCode.None },
  WarningMsg: { type: String, require: true },
  TimeStamp: { type: Date, default: Date.now },
});

warningSchema.index({ Sensor: 1 });
warningSchema.index({ TimeStamp: -1 });

export const WarningHistorySchema = mongoose.model<IWarningHistoryDocument>('WarningHistory', warningSchema);
