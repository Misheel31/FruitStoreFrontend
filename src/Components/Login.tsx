import "../css/UserLogin.css";
import Navbar from "./Navbar.tsx";
import {useMutation} from "react-query";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
const UserLogin =()=>{

    const navigate= useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    const loginUser = useMutation({
        mutationKey: 'LOGINUSER',
        mutationFn: (loginData) => {
            return axios.post("http://localhost:8080/authenticate", loginData);
        },
        onSuccess: (data) => {
            console.log(data.data)
            localStorage.setItem('token', data.data.token);
            setIsLoggedIn(true);
            if (data.data.role === "Admin") {
                navigate('/admin');
            } else {
                navigate('/');
            }
        },
        onError: (error) => {
            console.error("Error during login: ", error);
            alert("Something went wrong");
        }
    });

    const handleLogin = (values: any) => {
        loginUser.mutate(values);
    };

    const {register,
        handleSubmit,
        formState,
        reset
    } = useForm();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return(
        <>
            <Navbar/>
            <div className="main-login-wrapper">
                <div className="leftcontent_login"></div>
                <div className="wrapperLogin">
                    <div className="form-box">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="input-box">
                                <input type="email" required {...register("email")}/>

                                <label>Email </label>
                            </div>

                            <div className="input-box">
                                <input type="password" required {...register("password")}/>

                                <label>Password</label>
                            </div>

                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                                <a href="forgotpassword" className="forgetpassword">
                                    {""}
                                    Forgot Password ?
                                </a>
                            </div>

                            <button type="submit" className="login-button">
                                Login
                            </button>

                            <div className="register">
                                <p>
                                    Don't have an account?
                                    <a href="register" className="Login-link">
                                        {" "}
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                    {isLoggedIn && (
                        <div className="logout-dropdown">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                        )}
                </div>
            </div>
        </>
    )
}

export default UserLogin