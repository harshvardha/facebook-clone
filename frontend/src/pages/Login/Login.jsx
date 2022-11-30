import "./Login.css";

const Login = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook Clone</h3>
                    <span className="loginDescription">Connect with your friends and the world around you on facebook clone.</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="email" placeholder="email" className="loginInput" />
                        <input type="password" placeholder="password" className="loginInput" />
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forget Password?</span>
                        <button className="loginRegisterButton">Create a New Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;