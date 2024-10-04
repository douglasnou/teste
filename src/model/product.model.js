import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: mongoose.Schema.Types.String},
    price: {type: mongoose.Schema.Types.String},
    type: {type: mongoose.Schema.Types.String},
    description: {type: mongoose.Schema.Types.String}
}, {versionKey: false});

export const product = mongoose.model("products", productSchema);