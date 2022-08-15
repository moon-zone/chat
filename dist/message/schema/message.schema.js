"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose = require("mongoose");
exports.MessageSchema = new mongoose.Schema({
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=message.schema.js.map