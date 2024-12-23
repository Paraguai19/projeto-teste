import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts
export async function getTodosPosts() {
    // Seleciona o banco de dados "projeto-teste"
    const db = conexao.db("projeto-teste");
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

// Função assíncrona para criar um novo post
export async function criarPost(novoPost) {
    // Seleciona o banco de dados "projeto-teste"
    const db = conexao.db("projeto-teste");
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Insere o novo post na coleção e retorna o resultado da operação
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    // Seleciona o banco de dados "projeto-teste"
    const db = conexao.db("projeto-teste");
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    // Insere o novo post na coleção e retorna o resultado da operação
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
