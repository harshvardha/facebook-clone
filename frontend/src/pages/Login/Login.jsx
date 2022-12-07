import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authenticationApiCalls } from "../../apiCalls.js";
import { AppContext } from "../../context/AppContext.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(AppContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            if (!email || !password) {
                return window.alert("Please provide all the required details");
            }
            const loginDetails = {
                email,
                passWord: password
            };
            const response = await authenticationApiCalls.login(loginDetails);
            if (response.status === 200) {
                const accessToken = response.data.accessToken;
                const userDetails = response.data.others;
                console.log(userDetails);
                localStorage.setItem("ACCESS_TOKEN", accessToken);
                setUser(userDetails);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center">
            <div className="w-3/4 h-3/4 flex">
                <div className="flex flex-1 flex-col justify-center">
                    <h3 className="text-5xl font-extrabold text-[#1775ee] mb-3">Facebook Clone</h3>
                    <span className="text-2xl">Connect with your friends and the world around you on facebook clone.</span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                    <form className="p-5 bg-white rounded-xl flex flex-col justify-between gap-y-3" onSubmit={handleLogin}>
                        <input
                            className="h-12 rounded-xl border border-solid border-gray-900 text-lg pl-5"
                            type="email"
                            placeholder="email"
                            value={email}
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            className="h-12 rounded-xl border border-solid border-gray-900 text-lg pl-5"
                            type="password"
                            placeholder="password"
                            value={password}
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="h-12 rounded-xl border-none bg-[#1775ee] text-white text-xl font-medium cursor-pointer"
                        >Log In</button>
                        <span className="text-center text-[#1775ee]">Forget Password?</span>
                        <Link to={"/register"} className="w-1/2 self-center p-2.5 rounded-xl border-none bg-[#42b72a] text-white text-center text-xl font-medium cursor-pointer">
                            Create a New Account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;