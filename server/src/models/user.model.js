import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9]+$/, "Tên người dùng không được chứa ký tự đặc biệt!"],
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dq7l8216n/image/upload/v1628586213/avatar/avatar-default.png",
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    bio: {
        type: String,
        default: "",
    },
    salt: {
        type: String,
        select: false,
    },
    role: {
        enum: ["admin", "user"],
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.setPassword = function (password) {
    // Tạo một chuỗi ngẫu nhiên
    this.salt = crypto.randomBytes(16).toString("hex");

    // Băm mật khẩu với salt
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.password === hash;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
