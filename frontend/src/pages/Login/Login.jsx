import { CircularProgress } from "@mui/material";
import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleLogin = (event) => {
        event.preventDefault();
        loginCall({ email: email.current.value, passWord: password.current.value }, dispatch);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook Clone</h3>
                    <span className="loginDescription">Connect with your friends and the world around you on facebook clone.</span>
                </div>
                <div className="loginRight">
                    <form onSubmit={handleLogin}>
                        <div className="loginBox">
                            <input type="email" placeholder="email" className="loginInput" ref={email} required />
                            <input type="password" placeholder="password" className="loginInput" ref={password} required />
                            <button type="submit" disabled={isFetching} className="loginButton">{isFetching ? "Loading" : "Log In"}</button>
                            <span className="loginForgot">Forget Password?</span>
                            <Link to={"/register"}>
                                <button className="loginRegisterButton">Create a New Account</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;