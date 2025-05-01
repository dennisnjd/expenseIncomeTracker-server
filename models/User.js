import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: { type: String },
    dob: { type: String },
    profileImage: { type: String }, //base64 string
}, {
    timestamps: true,
});


const User = mongoose.model("User", userSchema);
export default User;