"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActions = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserActionsSchema = new mongoose_1.default.Schema({
    associatedUser: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});
const UserSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    activities: [
        UserActionsSchema
    ]
});
exports.User = mongoose_1.default.model("User", UserSchema);
exports.UserActions = mongoose_1.default.model("UserActions", UserActionsSchema);
//# sourceMappingURL=model.js.map