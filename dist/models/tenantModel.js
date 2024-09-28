"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tenantSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    tenantName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    AnotherPhone: {
        type: Number,
        required: true
    },
    members: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rentDecided: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    idNumber: {
        type: Number,
        required: true
    },
    // TenantPhotoLink: {
    //     type: String,
    //     required: true
    // },
    IdFileLink: {
        type: String,
        required: true
    },
    // PoliceChalan: {
    //     type: String,
    //     required: true
    // },
    QrCode: {
        type: String // Store qrCode as a Base64 String
    },
    isActive: {
        type: Boolean,
        default: false
    }
});
const tenantModel = mongoose_1.default.model('tenants', tenantSchema);
exports.default = tenantModel;
