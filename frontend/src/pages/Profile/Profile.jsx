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
    // const [user, setUser] = useState({});
    const params = useParams();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await axios.get(`/users/search?query=${params.username}`);
    //         setUser(res.data);
    //     }
    //     fetchData();
    // }, []);

    return (
        <>
            <Topbar />
            <div className="flex">
                <SideBar />
                <div className="flex-[9]">
                    <div>
                        <div className="h-[20rem] relative">
                            <img src={PF + "person/noCover.png"} alt="" className="w-full h-[15.625rem] object-cover" />
                            <img src={PF + "person/noAvatar.png"} alt="" className=" w-[9.375rem] h-[9.375rem] rounded-full object-cover absolute left-0 right-0 m-auto top-[9.375rem] border-3 border-solid border-white" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h4 className=" text-2xl">Harshvardhan Singh Chauhan</h4>
                            <span className="font-light">Hello world</span>
                        </div>
                    </div>
                    <div className="flex">
                        <Feed username="" />
                        <RightBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;