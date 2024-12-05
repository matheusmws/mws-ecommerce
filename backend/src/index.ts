import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { requestLogger, responseLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware para logar as requisições
app.use(requestLogger);

mongoose.connect(process.env.MONGO_URI || '')
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Success' });
    res.send('API de E-commerce');
});

// Middleware para logar a resposta ou erro
app.use(responseLogger);

// Middleware para tratar erros
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});