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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tenantModel_1 = __importDefault(require("../models/tenantModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const qrcode_1 = __importDefault(require("qrcode"));
const AddNewTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        // Validate the _id
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const User = yield userModel_1.default.findById(id);
        if (!User) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const { tenantName, phone, AnotherPhone, members, address, rentDecided, date, idNumber, IdFileLink } = req.body;
        // For QR-Code 
        const qrCodeData = `TENANT DETAILS: \n\n Tenant Name: ${tenantName},\n Id Card Number: ${idNumber},\n Members: ${members},\n Phone: ${phone},\n Address: ${address},\n Rent: ${rentDecided},\n Date: ${date},\n Id Card Link: ${IdFileLink}`;
        const QrCode = yield qrcode_1.default.toDataURL(qrCodeData); // Generate QR code as Base64 string
        const Tenants = yield tenantModel_1.default.create({
            userId: User._id,
            tenantName,
            phone,
            AnotherPhone,
            members,
            address,
            rentDecided,
            date,
            idNumber,
            IdFileLink,
            QrCode,
        });
        // Push tenant ID to user's tenant list and save user
        User.tenants.push(Tenants._id);
        yield User.save();
        res.status(200).json({ message: 'Tenant added successfully', tenant: Tenants });
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
});
const AllTenants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        // Validate the _id
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const User = yield userModel_1.default.findById(id).populate('tenants');
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ tenants: User.tenants });
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
});
const GetTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        const tenant = yield tenantModel_1.default.findById(id);
        if (!tenant) {
            res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json({ tenant });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
const DeleteTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        const tenant = yield tenantModel_1.default.findByIdAndDelete(id);
        if (!tenant) {
            res.status(404).json({ message: 'Tenant not found' });
        }
        // When deleting the tenant, remove it from the user's tenant list
        yield userModel_1.default.updateMany({ tenants: tenant === null || tenant === void 0 ? void 0 : tenant._id }, { $pull: { tenants: tenant === null || tenant === void 0 ? void 0 : tenant._id } });
        res.status(200).json({ message: 'Tenant deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Internal Server Error' });
    }
});
const UpdateTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        const data = req.body;
        const Tenant = yield tenantModel_1.default.findByIdAndUpdate(id, data, { new: true });
        if (!Tenant) {
            res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json({ message: 'Tenant updated successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Internal Server Error' });
    }
});
exports.default = { AddNewTenant, AllTenants, GetTenant, DeleteTenant, UpdateTenant };
