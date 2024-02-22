import React from 'react';
import { useLocation } from 'react-router-dom';

const Order: React.FC = () => {
    const location = useLocation();
    const orderDetails = location.state && location.state.orderDetails;

    return (
        <div>
            <h1>Order Details</h1>
            <ul>
                {orderDetails &&
                    orderDetails.map((item: any, index: number) => (
                        <li key={index}>
                            {item.name} - Quantity: {item.quantity} - Price:{parseFloat(item.price) * item.quantity}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Order;
