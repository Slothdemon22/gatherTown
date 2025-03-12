"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../config/db");
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
dotenv_1.default.config();
app.use((0, cors_1.default)({
    exposedHeaders: ["token"]
}));
app.use(express_1.default.json());
(0, db_1.connectdb)();
app.use("/api/auth", authRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
