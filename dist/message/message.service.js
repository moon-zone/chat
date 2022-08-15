"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MessageService = class MessageService {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async getMessage(res, { from, to }) {
        try {
            const messages = await this.messageModel
                .find({
                users: {
                    $all: [from, to],
                },
            })
                .sort({ updatedAt: -1 });
            const messagesData = messages.map((element) => {
                return {
                    self: element.sender.toString() === from.toString(),
                    message: element.message,
                };
            });
            return res.status(201).json(messagesData);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }
    async addMessage(res, { from, to, message }) {
        try {
            const data = await this.messageModel.create({
                message: message,
                users: [from, to],
                sender: from,
            });
            return res.sendStatus(201);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map