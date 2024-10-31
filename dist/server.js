"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
require('dotenv').config();
//app setup 1
const app = (0, express_1.default)();
const port = 8001;
const connection_url = process.env.MONGODB_URL;
// middleware 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// DB Config
mongoose_1.default.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// api routes
app.use("/api/user", userRoutes_1.default);
app.listen(port, () => {
    console.log(`Server started. Listening to port - ${port}`);
});
//# sourceMappingURL=server.js.map