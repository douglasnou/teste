import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const admSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: mongoose.Schema.Types.String, required: true},
    email: {type: mongoose.Schema.Types.String, required: true, unique: true},
    password: {type: mongoose.Schema.Types.String, required: true}
}, {versionKey: false});

admSchema.pre('save', async (next)=> {
    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }); //função que criptografa a senha
  
  admSchema.methods.comparePassword = async (password)=> {
    return bcrypt.compare(password, this.password);
  }; //compara as senhas

export const adm = mongoose.model("adms", admSchema);