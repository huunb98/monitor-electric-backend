"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemModel = void 0;
const mongoose = require("mongoose");
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
}, { collection: 'System' });
exports.SystemModel = mongoose.model('System', systemSchema);
//# sourceMappingURL=system.js.map