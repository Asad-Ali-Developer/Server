"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const { Register, Login, User } = authController_1.default;
const router = express_1.default.Router();
router.post('/register', Register);
router.post('/login', Login);
router.get('/user', authMiddleware_1.default, User);
exports.default = router;
