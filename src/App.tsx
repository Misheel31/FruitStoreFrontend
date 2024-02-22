import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import Login from "./Components/Login.tsx";
import Register from "./Components/Register.tsx";
import Home from "./Components/Home.tsx";
import ProductDetails from "./Components/ProductDetails.tsx";
import Fruit from "./Components/Fruits.tsx";
import AdminHome from "./Admin/AdminHome.tsx";
import AdminProductDetails from "./Admin/AdminProductDetails.tsx";
import AdminManageProduct from "./Admin/AdminManageProduct.tsx";
import AdminProductUplaod from "./Admin/AdminProductUplaod.tsx";
import Order from "./Components/Order.tsx";
import Cart from "./Components/Cart.tsx";

const router  =createBrowserRouter(

    [
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        },

        {
            path:"/",
            element:<Home/>
        },

        {
            path:'/fruits',
            element:<Fruit/>
        },

        {
            path:'/cart',
            element:<Cart/>
        },

        {
            path:`/item/retrieve-item-by-id/:id`,
            element:<ProductDetails/>
        },

        {
            path:`/admin`,
            element:<AdminHome/>
        },

        {
            path:`/item/retrieve-all-item`,
            element:<AdminProductDetails/>
        },

        {
            path: `/item/update-item/:id`,
            element: <AdminManageProduct />
        },
        {
            path: `/admin/delete-item-by-id/:id`,
            element: <AdminManageProduct />
        },

        {
            path: `/item/upload-fruit`,
            element: <AdminProductUplaod/>
        },

        {
            path: `/order/create`,
            element: <Order/>
        },

        {
            path: `/admin/delete`,
            element: <AdminHome/>
        },




    ]
)
const querClient= new QueryClient();
function App() {
    return (
        <>
            <QueryClientProvider client={querClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    )
}
export default App
