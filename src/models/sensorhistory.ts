import mongoose = require('mongoose');

export interface ISensorHistory {
  sensorId: string;
  log: Object;
  timeStamp: Date;
}
export interface ISensorHistoryDocument extends ISensorHistory, mongoose.Document {}

let sensorHistorySchema = new mongoose.Schema(
  {
    sensorId: String,
    log: Object,
    timeStamp: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'SensorHistory' }
);

sensorHistorySchema.index({ sensorId: 1 });

export const SensorHistoryModel = mongoose.model<ISensorHistoryDocument>('SensorHistory', sensorHistorySchema);
