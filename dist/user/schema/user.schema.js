"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const moment = require('moment');
exports.UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    imgUrl: {
        type: String,
        default: '',
    },
    creation: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=user.schema.js.map