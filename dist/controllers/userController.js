"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getAllUsers = void 0;
const model_1 = require("../db-models/model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utils/utils");
require('dotenv').config();
const SALT = process.env.saltVal;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_1.User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        console.log("An error occured at the getAllUsers function - ", error);
        res.status(500).send("internal server error");
    }
});
exports.getAllUsers = getAllUsers;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userEmail, hashedPassword } = req.body;
    console.log("registeruser triggeredd");
    try {
        const existingUser = yield model_1.User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new model_1.User({
            userName: userName.toLowerCase(),
            userEmail: userEmail.toLowerCase(),
            password: hashedPassword,
            role: "user",
            activities: []
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id, role: newUser.role }, SALT, { expiresIn: "15m" });
        yield (0, utils_1.addUserAction)(userEmail, 'Registered');
        res.status(201).json({ token: token, user: newUser, message: "User registered successfully" });
    }
    catch (error) {
        console.log("Error in registerUser function:", error);
        res.status(500).send("Internal server error");
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, password } = req.body;
    try {
        const user = yield model_1.User.findOne({ userEmail: userEmail });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, SALT, { expiresIn: "15m" });
        yield (0, utils_1.addUserAction)(userEmail, 'Logged in');
        res.status(200).json({ token: token, user: user, message: "Login successful" });
    }
    catch (error) {
        console.log("Error in loginUser function:", error);
        res.status(500).send("Internal server error while logging in :(");
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map