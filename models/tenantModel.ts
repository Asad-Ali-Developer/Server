import mongoose from "mongoose";


const tenantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: String    // Store qrCode as a Base64 String
    },
    isActive: {
        type: Boolean,
        default: false
    }
})


const tenantModel = mongoose.model('tenants', tenantSchema);
export default tenantModel;