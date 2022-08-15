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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(res, { fullname, email, password, confirmpassword }) {
        const userExists = await this.userModel.findOne({ email });
        if (userExists)
            return res.status(400).json('User already exits');
        if (password.length < 6)
            return res.status(400).json('Password must contain atleast 6 characters');
        if (password !== confirmpassword)
            return res.status(400).json('Password does not match.');
        const saltMethod = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltMethod);
        try {
            const user = await this.userModel.create({
                fullname,
                email,
                password: hashedPassword,
            });
            const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
                expiresIn: '90min',
            });
            return res.status(201).json({ message: 'Signup Successful', token });
        }
        catch (err) {
            return res.status(401).json(err.message);
        }
    }
    async login(res, { email, password }) {
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user)
            return res.status(400).json('Invalid email');
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword)
            return res.status(400).json('Incorrect Password');
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
            expiresIn: '90min',
        });
        return res.status(201).json({ message: 'Login Successful', token });
    }
    async protected(res) {
        return res.status(201).json(res.locals.user);
    }
    async getUsers(res, { id }) {
        try {
            const allUsers = await this.userModel
                .find({ _id: { $ne: new mongoose_2.default.Types.ObjectId(id) } })
                .select('-password')
                .sort({ createdAt: 1 });
            return res.status(201).json(allUsers);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }
    async getSingleUser(res, { id }) {
        try {
            const singleUser = await this.userModel
                .findById(new mongoose_2.default.Types.ObjectId(id))
                .select('-password');
            return res.status(201).json(singleUser);
        }
        catch (err) {
            return res.sendStatus(400).json(err.message);
        }
    }
    async setAvatar(res, { id }, { imgUrl }) {
        try {
            await this.userModel.findOneAndUpdate({ _id: id }, { imgUrl });
            return res.status(201).json({ message: 'Avatar Setup Successful' });
        }
        catch (err) {
            return res.sendStatus(400);
        }
    }
    async deleteUser(res, { id }) {
        try {
            await this.userModel.findOneAndDelete({ _id: id });
            return res.status(201).json({ message: 'Account deletion successful' });
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map