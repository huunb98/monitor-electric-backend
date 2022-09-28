import mongoose = require('mongoose');

export interface ISensorHistory {
  sensorId: string;
  log: Map<string, any>;
  timeStamp: Date;
}
export interface ISensorHistoryDocument extends ISensorHistory, mongoose.Document {}

let sensorHistorySchema = new mongoose.Schema({
  sensorId: String,
  log: {
    type: Map,
    of: Object,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export const SensorHistoryModel = mongoose.model<ISensorHistoryDocument>('SensorHistory', sensorHistorySchema);
