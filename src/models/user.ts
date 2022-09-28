import mongoose = require('mongoose');

export interface IUser {
  name: string;
  phone: string;
  service: string;
  userName: string;
  passWord: string;
}

export interface IUserDocument extends IUser, mongoose.Document {}

let userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: String, require: true },
  service: { type: String, require: true },
  userName: { type: String, require: true },
  passWord: { type: String, require: true },
});

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
