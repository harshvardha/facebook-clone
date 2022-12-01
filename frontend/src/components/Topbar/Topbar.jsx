import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Topbar.css";

const Topbar = ({ user }) => {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <span className="logo">Facebook-clone</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link>
                    <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImage" />
                </Link>
            </div>
        </div>
    )
}

export default Topbar;