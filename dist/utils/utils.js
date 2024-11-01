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
exports.addUserAction = void 0;
const model_1 = require("../db-models/model");
const addUserAction = (userEmail, action) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.User.findOne({ userEmail });
    if (user) {
        const userAction = new model_1.UserActions({
            associatedUser: userEmail,
            action,
            time: new Date().toISOString(),
        });
        yield userAction.save();
        user.activities.push(userAction.toObject());
        yield user.save();
    }
});
exports.addUserAction = addUserAction;
//# sourceMappingURL=utils.js.map