import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Topbar = () => {
    const { user } = useContext(AppContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="h-12 w-full bg-[#1877f2] flex items-center sticky top-0 z-10">
            <div className="flex-[3.25]">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <span className="text-2xl ml-5 font-bold text-white cursor-pointer">Facebook-clone</span>
                </Link>
            </div>
            <div className="flex-[5]">
                <div className="w-full h-8 bg-white rounded-[30px] flex items-center">
                    <Search className="text-xl ml-3" />
                    <input placeholder="Search for friend, post or video" className="border-none w-[70%] ml-1" />
                </div>
            </div>
            <div className="flex-[4] flex items-center justify-around text-white">
                <div className="ml-7 text-sm cursor-pointer flex gap-x-3">
                    <span className="mr-3 text-sm cursor-pointer">Homepage</span>
                    <span className="text-sm cursor-pointer">Timeline</span>
                </div>
                <div className="flex">
                    <div className="mr-4 cursor-pointer relative">
                        <Person />
                        <span className="w-4 h-4 bg-red-500 rounded-full text-white absolute -top-1 -right-1 flex items-center justify-center text-xs">1</span>
                    </div>
                    <div className="mr-4 cursor-pointer relative">
                        <Chat />
                        <span className="w-4 h-4 bg-red-500 rounded-full text-white absolute -top-1 -right-1 flex items-center justify-center text-xs">2</span>
                    </div>
                    <div className="mr-4 cursor-pointer relative">
                        <Notifications />
                        <span className="w-4 h-4 bg-red-500 rounded-full text-white absolute -top-1 -right-1 flex items-center justify-center text-xs">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user._id}`}>
                    <img
                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                        src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                        alt=""
                    />
                </Link>
            </div>
        </div>
    )
}

export default Topbar;