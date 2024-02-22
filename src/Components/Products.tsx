import React, { useState, useEffect } from "react";
import '../css/Products.css'
import {Link, useNavigate} from "react-router-dom";

interface ProductProps {
    headline: string;
    product: {
        id: string;
        name: string;
        image: string;
        price: string;
    }[];
}
const Product: React.FC<ProductProps> = ({ headline }) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = (id: string) => {
        navigate(`/item/retrieve-item-by-id/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/item/retrieve-all-item");
                const result = await response.json();
                console.log("Product Data:", result);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="product-container">
                <h2 className="product-headline">{headline}</h2>

                <div className="product-container">
                    {Array.isArray(data) && data.length > 0 ? (
                        <>
                            {data.map(({  id,name, image, price }) => (
                                <div key={id} className="product-card">
                                    <div className="product-image">
                                        <Link to={`/item/retrieve-item-by-id/${id}`}>
                                            <img
                                                src={image}
                                                alt=""
                                                className="product-image"
                                            />
                                        </Link>
                                    </div>
                                    <div className="product-info">
                                        <h2 className="product-title">{name}</h2>
                                        <p className="product-price">Price: {price}</p>
                                    </div>
                                    <button onClick={() => handleNavigate(id)}>
                                        View Details
                                    </button>
                                </div>

                            ))}
                        </>
                    ) : (
                        <p>No Products available</p>
                    )}
                </div>
            </div>

        </>
    );
};

export default Product;
