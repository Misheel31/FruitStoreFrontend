import "../css/UserRegister.css";
import {useMutation} from "react-query";
import axios from "axios";
import {useForm} from "react-hook-form";
import Navbar from "./Navbar.tsx";
import {useNavigate} from "react-router-dom";

const UserRegister = () => {
    const navigate = useNavigate();

    const saveData = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: (requestData: any) => {
            return axios.post("http://localhost:8080/user/register", requestData, {
            });
        },
    });

    const onRegister = (values: any) => {
        console.log("Register button clicked");
        console.log(values);
        saveData.mutate(values)
        navigate("/login")
    };

    const {register,
        handleSubmit,
        formState,
        reset
    } = useForm();

    return(
        <>
            <Navbar/>
            <div className="main-register-wrapper">
                <div className="leftcontent_regsiter"></div>
                <div className="wrapperRegister">
                    <div className="form-box-register">
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit(onRegister)}>

                        <div className="input-box-register">
                            <input type="text" required {...register("username")}/>
                            <label>Username </label>
                        </div>

                        <div className="input-box-register">
                            <input type="email" required {...register("email")}/>
                            <label>Email </label>
                        </div>

                        <div className="input-box-register">
                            <input type="password" required {...register("password")}/>
                            <label>Password</label>
                        </div>

                        <div className="input-box-register">
                            <input type="password" required {...register("confirmPassword")}/>
                            <label>Confirm Password</label>
                        </div>

                        <div className="conditions">
                            <label>
                                <input type="checkbox" />
                                I agree to the terms and conditions
                            </label>
                        </div>

                        <button type="submit" className="register-btn">
                            Register
                        </button>

                        <div className="login">
                            <p>
                                Already have an account?
                                <a href="login" className="Register-link">
                                    {" "}
                                    Login
                                </a>
                            </p>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}


export default UserRegister
