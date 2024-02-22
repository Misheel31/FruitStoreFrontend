import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminSideBar from "./AdminSidebar.tsx";

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
}

const AdminProductDetail: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/item/retrieve-all-item');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async ({id}: { id }) => {
        try {
            await axios.delete(`http://localhost:8080/admin/delete-item-by-id/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <>
            <AdminSideBar />
            <div className='products-containers'>
                <div className="Product-container">
                    {Array.isArray(products) && products.length > 0 ? (
                        <>
                            {products.map((product) => (
                                <div key={product.id} className='product-card'>
                                    <div className="product-image">
                                        <img src={product.image} alt={product.name} className="product-image__img" />
                                    </div>
                                    <div className="product-info">
                                        <h2 className="product-title">{product.name}</h2>
                                        <p className="product-price">Price: {product.price}</p>
                                        <Link to={`/item/update-item/${product.id}`}>
                                            <div className="button-edit">
                                            <button>Edit</button>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='button-delete'>
                                        <button onClick={() => handleDelete({id: product.id})}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminProductDetail;
