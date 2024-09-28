"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const tenantController_1 = __importDefault(require("../controllers/tenantController"));
const { AddNewTenant, AllTenants, GetTenant, DeleteTenant, UpdateTenant } = tenantController_1.default;
const router = express_1.default.Router();
router.get('/all-tenants/:_id', authMiddleware_1.default, AllTenants);
router.post('/add-tenant/:_id', authMiddleware_1.default, AddNewTenant);
router.get('/tenant/:_id', authMiddleware_1.default, GetTenant);
router.delete('/delete-tenant/:_id', authMiddleware_1.default, DeleteTenant);
router.patch('/update-tenant/:_id', authMiddleware_1.default, UpdateTenant);
exports.default = router;
