import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o módulo Multer para lidar com uploads de arquivos

// Importa funções controladoras de um arquivo externo
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
   // some legacy browsers (IE11, various SmartTVs
}

// Configura o armazenamento para uploads em disco usando Multer.diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos enviados ("uploads/")
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original enviado ("file.originalname")
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer usando a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Linux/Mac: "./uploads"

const routes = (app) => {
  // Habilita o middleware para interpretar requisições no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts. Chama a função "listarPosts" do controlador.
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post. Chama a função "postarNovoPost" do controlador.
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagens. 
  // - "upload.single('imagem')" processa um único arquivo chamado "imagem" na requisição.
  // - Chama a função "uploadImagem" do controlador após o processamento do arquivo.
  app.post("/upload", upload.single("imagem"), uploadImagem);

app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
