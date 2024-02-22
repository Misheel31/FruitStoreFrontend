import {useEffect, useState} from "react";
import axios from "axios";
import Product from "./Products.tsx";
const BestProduct=()=>{
    const [product,setBestProducts]=useState([]);

    useEffect(() => {
        const fetchData=async ()=>{
            try {
                const response = await axios.get("/item/retrieve-all-item");
                setBestProducts(response.data);
            }
            catch (error){
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Product product={product} headline="Products"/>

        </div>
    )
}

export default BestProduct