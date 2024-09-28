import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    IdFileLink: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenants'
    }]
})

const userModel = mongoose.model('users', userSchema)
export default userModel;