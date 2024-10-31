"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.route("/getAllUsers").get(userController_1.getAllUsers);
router.route("/signup").post(userController_1.registerUser);
router.route("/login").post(userController_1.loginUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map