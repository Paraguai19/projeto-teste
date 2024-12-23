import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Chama a função do modelo para obter todos os posts do banco de dados
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Extrai os dados do novo post da requisição
    const novoPost = req.body;
    try {
        // Chama a função do modelo para criar o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra um erro, loga o erro no console e envia uma resposta com status 500 (Erro Interno do Servidor)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Erro ao criar post" });
    }
}

// Função assíncrona para realizar o upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    // Cria um novo objeto de post com a descrição e a imagem (nome original do arquivo)
    const novoPost = {
        descricao: "",
        imagem: req.file.originalname,
        alt: ""
    };

    try {
        // Chama a função do modelo para criar o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Gera um novo nome para a imagem com o ID do post inserido
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo da imagem para o novo nome
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra um erro, loga o erro no console e envia uma resposta com status 500 (Erro Interno do Servidor)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Erro ao criar post" });
    }
}

export async function atualizarNovoPost(req, res) {
    // Extrai os dados do novo post da requisição
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        // Chama a função do modelo para criar o novo post no banco de dados
        const postCriado = await atualizarPost(id, post);
        // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra um erro, loga o erro no console e envia uma resposta com status 500 (Erro Interno do Servidor)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Erro ao criar post" });
    }
}
