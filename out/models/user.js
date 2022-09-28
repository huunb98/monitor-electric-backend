"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phone: { type: String, require: true },
    service: { type: String, require: true },
    userName: { type: String, require: true },
    passWord: { type: String, require: true },
});
exports.UserModel = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map