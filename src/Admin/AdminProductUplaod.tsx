import  { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminSideBar from './AdminSidebar';

const UploadFruit = () => {
    const [data, setData] = useState({
        itemName: '',
        description: '',
        image: '',
        price: '',
    });

    const FruitUpload = async (e) => {
        e.preventDefault();
        const { itemName, description, image, price } = data;
        try {
            const { data } = await axios.post('http://localhost:8080/admin/upload-fruit', {
                itemName,
                description,
                image,
                price,
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setData({
                    itemName: '',
                    description: '',
                    image: '',
                    price: '',
                });
                toast.success('Fruit Uploaded Successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="uploadFruitContainer">
            <div className="slibebar_upload">
                <AdminSideBar />
            </div>
            <div className="upload-form-container">
                <h2>Upload a Fruit</h2>
                <form onSubmit={FruitUpload}>
                    <div className="fruit_title">
                        Fruit Name:
                        <input
                            type="text"
                            name="fruitName"
                            value={data.itemName}
                            onChange={(e) => setData({ ...data, itemName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="fruit_title">
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="fruit_title">
                        Image URL:
                        <input
                            type="text"
                            name="imageURL"
                            value={data.image}
                            onChange={(e) => setData({ ...data, image: e.target.value })}
                            required
                        />
                    </div>

                    <div className="fruit_title">
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={data.price}
                            onChange={(e) => setData({ ...data, price: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UploadFruit;
