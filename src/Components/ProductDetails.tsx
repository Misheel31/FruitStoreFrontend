import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar.tsx";
import { useCart } from "../Context/CartContext.tsx";
import toast from "react-hot-toast";

interface Product {
    id: number;
    description: string;
    image: string;
    name: string;
    price: string;
}

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [selectedProduct, setTotalPrice] = useState(Number(product?.price) || 0);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get<Product>(
                    `http://localhost:8080/item/retrieve-item-by-id/${id}`
                );
                setProduct(response.data);
                setTotalPrice(Number(response.data.price) * quantity);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching item data:", error);
                setError("Error fetching item data");
            }
        };
        if (id) {
            fetchItemData();
        }
    }, [id, quantity]);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
        setTotalPrice(Number(product?.price) * (quantity + 1));
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalPrice(Number(product?.price) * (quantity - 1));
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                price: product.price,
                image: product.image,
                quantity: quantity,
                name: product.name,
            });

            toast.success('Added to cart!');
            navigate('/cart');
        }
    };

    return (
        <>
            <Navbar />
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : !product ? (
                <p>No product found</p>
            ) : (
                <div className="main-product-details-container">
                    <div className="product-details-box-container">
                        <img
                            src={product.image}
                            className="product-details-image"
                            alt={product.name}
                        />

                        <div className="product-button">
                            <button onClick={handleDecrement}>-</button>
                            <span>{quantity}</span>
                            <button onClick={handleIncrement}>+</button>
                            <button onClick={handleAddToCart}>Add to cart</button>
                        </div>

                        <div className="product-info">
                            <h2 className="product-title">{product.name}</h2>
                            <p className="product-price">Price: {product.price}</p>
                            <p className="product-description">{product.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;
