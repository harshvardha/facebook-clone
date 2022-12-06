import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const navigateTo = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        console.log("username: ", username);
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("password again: ", passwordAgain);
    }

    return (
        <div className="w-screen h-screen bg-[#f0f2f5] flex items-center justify-center">
            <div className="w-3/4 h-3/4 flex">
                <div className="flex flex-1 flex-col justify-center">
                    <h3 className="text-5xl font-extrabold text-[#1775ee] mb-3">Facebook Clone</h3>
                    <span className="text-2xl">Connect with your friends and the world around you on facebook clone.</span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                    <form onSubmit={handleRegister}>
                        <div className="h-4/5 p-5 bg-white rounded-xl flex flex-col justify-between gap-y-4">
                            <input
                                className="h-16 rounded-xl border border-solid border-gray-900 text-lg pl-5"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <input
                                className="h-16 rounded-xl border border-solid border-gray-900 text-lg pl-5"
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <input
                                className="h-16 rounded-xl border border-solid border-gray-900 text-lg pl-5"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <input
                                className="h-16 rounded-xl border border-solid border-gray-900 text-lg pl-5"
                                type="password"
                                placeholder="Confirm Password"
                                value={passwordAgain}
                                onChange={(event) => setPasswordAgain(event.target.value)}
                            />
                            <button
                                className="h-16 rounded-xl border-none bg-[#1775ee] text-white text-xl font-medium cursor-pointer"
                                type="submit"
                            >
                                Sign Up
                            </button>
                            <button
                                className="w-1/2 self-center h-16 rounded-xl border-none bg-[#42b72a] text-white text-xl font-medium cursor-pointer"
                            >
                                Log into Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;