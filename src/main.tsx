import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {CartProvider} from "./Context/CartContext.tsx";
import {AuthProvider} from "./Context/AuthContext.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
      <CartProvider>
    <App />
      </CartProvider>
      </AuthProvider>
  </React.StrictMode>,
);
