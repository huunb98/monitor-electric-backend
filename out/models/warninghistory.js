"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningHistoryModel = exports.WarningCode = void 0;
const mongoose = require("mongoose");
var WarningCode;
(function (WarningCode) {
    WarningCode[WarningCode["None"] = 0] = "None";
    WarningCode[WarningCode["OverTemp"] = 1] = "OverTemp";
    WarningCode[WarningCode["OverX"] = 2] = "OverX";
    WarningCode[WarningCode["OverY"] = 3] = "OverY";
    WarningCode[WarningCode["OverZ"] = 4] = "OverZ";
})(WarningCode = exports.WarningCode || (exports.WarningCode = {}));
let warningSchema = new mongoose.Schema({
    sensorId: { type: String, require: true },
    warningCode: { type: Number, default: WarningCode.None },
    warningMsg: { type: String, require: true },
    timeStamp: { type: Date, default: Date.now },
});
warningSchema.index({ sensorId: 1 });
warningSchema.index({ timeStamp: -1 });
exports.WarningHistoryModel = mongoose.model('WarningHistory', warningSchema);
//# sourceMappingURL=warninghistory.js.map