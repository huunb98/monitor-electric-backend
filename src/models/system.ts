'use strict';

import mongoose = require('mongoose');

// let sensorSchema = new mongoose.Schema({
//   SensorId: { type: String, require: true },
//   SensorName: { type: String, require: true },
//   Description: { type: String, require: false },
//   SystemId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'System' },
//   GatewayId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Gateway' },
// });

// sensorSchema.index({ SensorId: 1 }, { sparse: true, background: true });

// sensorSchema.index(
//   {
//     SensorName: 'text',
//   },
//   {
//     sparse: true,
//     background: true,
//   }
// );

// export const SensorModel = mongoose.model('Sensor', sensorSchema);

export interface ISytem {
  Name: string;
  Description: String;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface ISystemDocument extends ISytem, mongoose.Document {}

let systemSchema = new mongoose.Schema({
  Name: { type: String, require: true },
  Description: String,
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const WarningHistorySchema = mongoose.model<ISystemDocument>('System', systemSchema);
