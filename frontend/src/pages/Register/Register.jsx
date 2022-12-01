import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigateTo = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                passWord: password.current.value
            };
            try {
                await axios.post("http://localhost:5000/authentication/register", user)
                navigateTo("/login");
            } catch (error) {
                console.log(error);
            }
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
                    <form onSubmit={handleRegister}>
                        <div className="loginBox">
                            <input type="text" placeholder="Username" className="loginInput" ref={username} />
                            <input type="email" placeholder="Email" className="loginInput" ref={email} />
                            <input type="password" placeholder="Password" className="loginInput" ref={password} />
                            <input type="password" placeholder="Confirm Password" className="loginInput" ref={passwordAgain} />
                            <button type="submit" className="loginButton">Sign Up</button>
                            <button className="loginRegisterButton">Log into Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;