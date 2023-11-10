"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const Server = new http_1.default.Server(app);
const socketIO = new socket_io_1.default.Server(Server);
const PORT = 4000;
app.get("/", (req, res) => {
    res.send("hello from server");
});
Server.listen(PORT, () => console.log("server started at " + PORT));
