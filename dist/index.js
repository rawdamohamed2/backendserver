"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const favorites_1 = __importDefault(require("./routes/favorites"));
const notes_1 = __importDefault(require("./routes/notes"));
const mongoose_1 = require("./db/mongoose");
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/favorites", favorites_1.default);
app.use("/api/notes", notes_1.default);
(0, mongoose_1.connectDB)().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
