import Topbar from "../../components/Topbar/Topbar";
import SideBar from "../../components/SideBar/SideBar";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/RightBar/RightBar";

const Home = () => {
    return (
        <div>
            <Topbar />
            <div className="flex w-full">
                <SideBar />
                <Feed />
                <RightBar />
            </div>
        </div>
    )
}

export default Home;