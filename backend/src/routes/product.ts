import express, { Request, Response } from 'express';
import Product from '../models/Product';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter produtos' });
    }
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
});

router.put('/:id', authenticate, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
});

router.delete('/:id', authenticate, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar produto' });
    }
});

export default router;