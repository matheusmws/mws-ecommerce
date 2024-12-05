// frontend/src/pages/Products.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
    _id: string;
    name: string;
    price: number;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Produtos</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>{product.name} - R${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Products;