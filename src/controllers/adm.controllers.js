import jwt from "jsonwebtoken";
import "dotenv/config";
import { adm } from "../model/adm.model.js";
import { product } from "../model/product.model.js";

export class AdmControllers{
    static async getProducts(req, res){
        const showProduct = await product.find({});
        res.status(200).json(showProduct)
    }

    static async postProducts(req, res){
        try {
            const postProduct = await product.create(req.body);
            res.status(201).json({message: "produto adicionado com sucesso", produto: postProduct});
        } catch (error) {
            res.status(500).json({message:`${error.message} - erro ao cadastrar produto`})
        }
    }

    static async putProduct(req, res){
        const id = req.params.id;
        try {
            const updateProduct = await product.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Produto atualizado."});
        } catch (error) {
            res.status(500).json({message: `${error.message} - erro ao atualizar produto.`})
        }
    }

    static async deleteProduct(req, res){
        const id = req.params.id;
        try {
            const deletarProduto = await product.findByIdAndDelete(id);
            res.status(202).send("Produto deletado.");
        } catch (error) {
            res.status(500).json({message: `${error.message} - erro ao deletar produto.`});
        }
    }

    static async registerAdm(req, res){
        const { name, email, password } = req.body;
      
        try {
          let Adm = await adm.findOne({ email });
          if (Adm) {
            return res.status(400).json({ msg: 'this user already exists.' });
          }
          Adm = new adm({
            name,
            email,
            password
          });      
          await Adm.save();

          // Gerar o token JWT
          const token = jwt.sign({ id: Adm._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
          res.status(200).json({ token });
        } catch (err) {
          res.status(500).json({ msg: 'Erro no servidor' });
        }
      };

      static async loginAdm(req, res){
        const { email, password } = req.body;
      
        try {
          const Adm = await adm.findOne({ email });
          if (!Adm) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
          }//verifica se o email de usuário consta no banco de dados
      
          const isMatch = await Adm.comparePassword(password);
          if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
          }// verifica se a senha é válida
      
          // Gerar o token JWT
          const token = jwt.sign({ id: Adm._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
          res.json({ token });
        } catch (err) {
          res.status(500).json({ msg: 'Erro no servidor' });
        }
      };
      
}