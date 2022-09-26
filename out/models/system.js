'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningHistorySchema = void 0;
const mongoose = require("mongoose");
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
exports.WarningHistorySchema = mongoose.model('System', systemSchema);
//# sourceMappingURL=system.js.map