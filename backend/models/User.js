"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@switch\.com$/, "Please enter a valid Switch email"], // Must use RegEx when using TS & Mongoose
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    lastname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
        enum: ["Engineering", "Security", "DCO Systems", "NetOps"], //only these are allowed
    },
    startdate: {
        type: Date,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "🥸", // will need to come back to this
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("User", UserSchema);
// "User" is the name of the model
// UserSchema is the schema object that defines the DB structure
