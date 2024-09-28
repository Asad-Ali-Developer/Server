"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const userRouter_1 = __importDefault(require("./Routes/userRouter"));
const tenantsRouter_1 = __importDefault(require("./Routes/tenantsRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 4000;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// This route is used for the Authentication
app.use('/api/auth', userRouter_1.default);
// This route is used for the tenants
app.use('/api', tenantsRouter_1.default);
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
