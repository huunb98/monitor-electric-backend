'use strict';

import mongoose = require('mongoose');

export interface ISensorHistory {
  SensorId: string;
  Log: Map<string, any>;
  TimeStamp: Date;
}
export interface ISensorDocument extends ISensorHistory, mongoose.Document {}

let sensorHistorySchema = new mongoose.Schema({
  SensorId: String,
  Log: {
    type: Map,
    of: Object,
  },
  TimeStamp: {
    type: Date,
    default: Date.now,
  },
});

export const WarningHistorySchema = mongoose.model<ISensorDocument>('SensorHistory', sensorHistorySchema);
