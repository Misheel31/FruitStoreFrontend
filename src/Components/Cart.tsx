import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.tsx';
import toast from 'react-hot-toast';

interface Product {
    id: number;
    image: string;
    price: string;
    quantity: number;
    name: string;
}

const Cart: React.FC = () => {
    const { cart, incrementItem, decrementItem, removeFromCart } = useCart();
    const navigate = useNavigate();

    const handleBuyNow = async () => {
        try {
            if (cart.length === 0) {
                toast.error('Your cart is empty. Please add items to your cart before ordering.');
                return;
            }
            navigate('/order/create', {
                state: { orderDetails: cart },
            });

            toast.success('Order created successfully!');
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Failed to create order. Please try again.');
        }
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                                <span>{item.name}</span>
                                <span>Price: {item.price}</span>
                                <button onClick={() => incrementItem(item.id)}>+</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => decrementItem(item.id)}>-</button>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
