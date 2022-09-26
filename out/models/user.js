'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    Name: { type: String, require: true },
    Phone: { type: String, require: true },
    Service: { type: String, require: true },
    UserName: { type: String, require: true },
    PassWord: { type: String, require: true },
});
exports.UserModel = mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map