"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.get('/user/:id', adminController_1.getUserById);
router.post('/create', adminController_1.createUser);
router.put('/update/:id', adminController_1.updateUser);
router.post('/delete/:id', adminController_1.deleteUser);
router.post('/action', adminController_1.addAction);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map