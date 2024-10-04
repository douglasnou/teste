import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: mongoose.Schema.Types.String, required: true},
    email: {type: mongoose.Schema.Types.String, required: true},
    password: {type: mongoose.Schema.Types.String, required: true}
}, {versionKey: false});

export const user = mongoose.model("users", userSchema);