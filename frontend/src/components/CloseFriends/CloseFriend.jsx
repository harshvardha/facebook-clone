import { useState } from "react";
import { useEffect } from "react";
import { userApiRequests } from "../../services/apiCalls";
import "./CloseFriend.css";

const CloseFriend = ({ userId }) => {
    const [user, setUser] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getUser = async () => {
            try {
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
                const response = await userApiRequests.getUserById(accessToken, userId);
                console.log(response);
                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log(error);
                window.alert("Something went wrong.");
            }
        }
        getUser();
    }, [userApiRequests.getUserById, userId])

    return (
        <li className="sidebarFriend">
            <img src={user?.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="sidebarFriendImage" />
            <span className="sidebarFriendName">{user?.username}</span>
        </li>
    )
}

export default CloseFriend