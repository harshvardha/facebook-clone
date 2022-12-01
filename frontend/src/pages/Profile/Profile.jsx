import Topbar from "../../components/Topbar/Topbar";
import SideBar from "../../components/SideBar/SideBar";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/RightBar/RightBar";
import "./Profile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/users/search?query=${params.username}`);
            setUser(res.data);
        }
        fetchData();
    }, []);

    return (
        <>
            <Topbar />
            <div className="profile">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture || PF + "person/noCover.png"} alt="" className="profileCoverImage" />
                            <img src={user.profilePicture || PF + "person/noAvatar.png"} alt="" className="profileUserImage" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDescription">{user.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username="" />
                        <RightBar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;