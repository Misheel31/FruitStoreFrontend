import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import '../css/Navbar.css';
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    return (
        <header>
            <div className="logo-flex">
                <NavLink to="/" className="nav-link">
                    <h1>Always Fresh </h1>
                </NavLink>
            </div>
            <div className="navlist">
                <NavLink to="/fruits" className="nav-link">Fruits</NavLink>
                <NavLink to="/cart" className="nav-link">Cart</NavLink>
                {isLoggedIn ? (
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                ) : (
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                )}
            </div>
        </header>
    );
};
export default Navbar;
 