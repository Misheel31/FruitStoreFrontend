import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AdminSideBar from "./AdminSidebar.tsx";

const AdminManageProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        itemName: '',
        price: '',
        image: '',
        description: '',
        quantity: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/item/retrieve-item-by-id/${id}`);
                const productData = response.data;
                setData({
                    itemName: productData.itemName || '',
                    price: productData.price || '',
                    image: productData.image || '',
                    description: productData.description || '',
                    quantity: productData.quantity || '',
                });
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log('Update ID:', id);
        console.log('Update Data:', data);

        try {
            const response = await axios.patch(`http://localhost:8080/admin/update-item/${id}`, data);

            console.log('Update response:', response);

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Product Updated Successfully');
                navigate('/admin');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <>
            <AdminSideBar />
            <div className="manage-product-container">
                <h2>Manage a Product</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="product-name">
                        <label htmlFor="itemName">Name:</label>
                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            value={data.itemName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="product-price">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="product-image">
                        <label htmlFor="image">Image:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={data.image}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="product-description">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="product-quantity">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={data.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    );
};

export default AdminManageProduct;
