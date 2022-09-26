'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningHistorySchema = exports.WarningCode = void 0;
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
    Sensor: { type: String, require: true },
    WarningCode: { type: WarningCode, default: WarningCode.None },
    WarningMsg: { type: String, require: true },
    TimeStamp: { type: Date, default: Date.now },
});
warningSchema.index({ Sensor: 1 });
warningSchema.index({ TimeStamp: -1 });
exports.WarningHistorySchema = mongoose.model('WarningHistory', warningSchema);
//# sourceMappingURL=warninghistory.js.map