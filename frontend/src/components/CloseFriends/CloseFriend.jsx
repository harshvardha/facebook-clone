import { useState, useEffect } from "react";
import { usersApiCalls } from "../../apiCalls";

const CloseFriend = ({ userId }) => {
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
                const response = await usersApiCalls.getUserById(userId, accessToken);
                if (response.status === 200) {
                    setUser(response.data);
                }
                else {
                    window.alert(response.statusText);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [])

    return (
        <li className="flex items-center mb-[0.9375rem]">
            <img src={user?.profilePicture || PF + "person/noAvatar.png"} alt="" className="w-8 h-8 rounded-full object-cover mr-[0.625rem]" />
            <span className="font-medium">{user?.username}</span>
        </li>
    )
}

export default CloseFriend