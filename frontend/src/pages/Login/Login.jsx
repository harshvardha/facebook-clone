import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticationApiRequests } from "../../services/apiCalls";
import "./Login.css";

const Login = () => {
    const email = useRef();
    const password = useRef();
    const [isFetching, setIsFetching] = useState(false)
    const navigateTo = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            if (!email.current.value || !password.current.value) {
                return window.alert("Please provide all the required credentials.");
            }
            const loginDetails = {
                email: email.current.value,
                passWord: password.current.value
            };
            console.log(loginDetails);
            const response = await authenticationApiRequests.login(loginDetails);
            if (response.status === 200) {
                const accessToken = response.data.accessToken;
                localStorage.setItem("ACCESS_TOKEN", accessToken);
                navigateTo("/home");
            }
        } catch (error) {
            console.log(error);
            window.alert("Something went wrong.")
        }
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
                            <Link to={"/register"} style={{ textAlign: "center" }}>
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