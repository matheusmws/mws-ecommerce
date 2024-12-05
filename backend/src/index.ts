import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '')
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.get('/', (req, res) => {
    res.send('API de E-commerce');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});