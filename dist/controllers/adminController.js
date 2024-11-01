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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.addAction = exports.getUserById = exports.updateUser = exports.createUser = void 0;
const model_1 = require("../db-models/model");
const utils_1 = require("../utils/utils");
require('dotenv').config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userEmail, password, role, requestingUserEmail } = req.body;
        console.log("create user call");
        const adminCheck = yield model_1.User.findOne({ userEmail: requestingUserEmail });
        if (adminCheck.role !== "admin") {
            return res.status(404).json({ message: 'operation must be performed by a user in admin role' });
        }
        const newUser = new model_1.User({ userName, userEmail, password, role });
        yield newUser.save();
        yield (0, utils_1.addUserAction)(requestingUserEmail, 'Created a new user');
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userEmail, password, role, requestingUserEmail } = req.body;
        console.log(userName, userEmail, password, role, requestingUserEmail);
        const adminCheck = yield model_1.User.findOne({ userEmail: requestingUserEmail });
        if (adminCheck.role !== "admin") {
            return res.status(404).json({ message: 'operation must be performed by a user in admin role' });
        }
        const user = yield model_1.User.findByIdAndUpdate(req.params.id, { userName, userEmail, password, role }, { new: true });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        yield (0, utils_1.addUserAction)(requestingUserEmail, `Updated a user details`);
        res.status(200).json({ message: 'User updated successfully', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});
exports.updateUser = updateUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});
exports.getUserById = getUserById;
const addAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestingUserEmail, action } = req.body;
        yield (0, utils_1.addUserAction)(requestingUserEmail, action);
        res.status(200).send({ message: "Action added successfully" });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding action' });
    }
});
exports.addAction = addAction;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestingUserEmail } = req.body;
        const user = yield model_1.User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        yield (0, utils_1.addUserAction)(requestingUserEmail, 'Deleted a user');
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=adminController.js.map