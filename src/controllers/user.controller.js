import jwt from "jsonwebtoken";
import "dotenv/config";
import { product } from "../model/product.model.js";
import { user } from "../model/user.model.js";

export class UserController{
    static async getProducts(req, res){
        const showProduct = await product.find({});
        res.status(200).json(showProduct)
    };

    static async registerUser(req, res){
        const { name, email, password } = req.body;
      
        try {
          let User = await user.findOne({ email });
          if (User) {
            return res.status(400).json({ msg: 'Usuário já existe' });
          }
      
          User = new user({
            name,
            email,
            password
          });
      
          await User.save();
      
          // Gerar o token JWT
          const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
          res.json({ token });
        } catch (err) {
          res.status(500).json({ msg: 'Erro no servidor' });
        }
      };

      static async loginUser(req, res){
        const { email, password } = req.body;
      
        try {
          const User = await user.findOne({ email });
          if (!User) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
          }
      
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
          }
      
          // Gerar o token JWT
          const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
          res.json({ token });
        } catch (err) {
          res.status(500).json({ msg: 'Erro no servidor' });
        }
      };

}