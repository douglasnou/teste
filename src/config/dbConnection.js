import mongoose from "mongoose";
import "dotenv";

export const connectToDatabase = async () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conectado ao MongoDB');
      }).catch(err => {
        console.error('Erro de conexão:', err);
      });

    return mongoose.connection;
};