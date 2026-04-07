import mongoose from "mongoose";

async function conectaNaDatabase(){
    try {
        await mongoose.connect(process.env.DB_STRING_CONNECTION);
        console.log("Banco conectado com sucesso!");
        return mongoose.connection;
    } catch (erro) {
        console.error("Erro ao conectar ao banco:", erro);
    }
}

export default conectaNaDatabase;