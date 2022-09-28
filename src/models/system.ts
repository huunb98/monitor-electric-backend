import mongoose = require('mongoose');

export interface ISytem {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISystemDocument extends ISytem, mongoose.Document {}

let systemSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const SystemModel = mongoose.model<ISystemDocument>('System', systemSchema);
