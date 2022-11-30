import Topbar from "../../components/Topbar/Topbar";
import SideBar from "../../components/SideBar/SideBar";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/RightBar/RightBar";
import "./Profile.css";

const Profile = () => {
    return (
        <>
            <Topbar />
            <div className="profile">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src="assets/post/3.jpeg" alt="" className="profileCoverImage" />
                            <img src="assets/person/7.jpeg" alt="" className="profileUserImage" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Harshvardhan Singh Chauhan</h4>
                            <span className="profileInfoDescription">Hello My Friends.</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <RightBar profile />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;