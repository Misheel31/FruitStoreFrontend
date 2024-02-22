import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
}

type CartAction =
    | { type: 'SET_CART'; payload: CartItem[] }
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'UPDATE_CART_ITEM_QUANTITY'; payload: { itemId: number; newQuantity: number } };

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: { image: string; quantity: number; price: string; name: string; id: number }) => void;
    removeFromCart: (itemId: number) => void;
    incrementItem: (itemId: number) => void;
    decrementItem: (itemId: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const initialState: CartState = {
    cart: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                cart: action.payload,
            };
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload),
            };
        case 'UPDATE_CART_ITEM_QUANTITY':
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload.itemId
                        ? { ...item, quantity: action.payload.newQuantity }
                        : item
                ),
            };
        default:
            return state;
    }
};

interface CartProviderProps {
    children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (itemId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };

    const incrementItem = (itemId: number) => {
        dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { itemId, newQuantity: 1 } });
    };

    const decrementItem = (itemId: number) => {
        dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { itemId, newQuantity: -1 } });
    };

    return (
        <CartContext.Provider value={{ cart: cartState.cart, addToCart, removeFromCart, incrementItem, decrementItem }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { CartProvider, useCart };
