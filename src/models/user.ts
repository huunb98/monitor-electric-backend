'use strict';

import mongoose = require('mongoose');

export interface IUser {
  Name: string;
  Phone: string;
  Service: string;
  UserName: string;
  PassWord: string;
}

export interface IUserDocument extends IUser, mongoose.Document {}

let userSchema = new mongoose.Schema({
  Name: { type: String, require: true },
  Phone: { type: String, require: true },
  Service: { type: String, require: true },
  UserName: { type: String, require: true },
  PassWord: { type: String, require: true },
});

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
