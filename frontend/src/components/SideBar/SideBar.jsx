import {
    RssFeed,
    Chat,
    PlayCircle,
    Group,
    BookmarkOutlined,
    HelpOutlineOutlined,
    WorkOutlineOutlined,
    Event,
    School
} from "@mui/icons-material";
import { Users } from "../../dummyData";
import CloseFriend from "../CloseFriends/CloseFriend";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SideBar = () => {
    const { user } = useContext(AppContext);

    return (
        <div className="flex-[3] section-min-height overflow-y-scroll sticky top-12">
            <div className="p-5">
                <ul className="p-0 m-0 list-none">
                    <li className="flex items-center mb-5">
                        <RssFeed className="mr-3" />
                        <span className="text-base font-normal">Feed</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <Chat className="mr-3" />
                        <span className="text-base font-normal">Chats</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <PlayCircle className="mr-3" />
                        <span className="text-base font-normal">Videos</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <Group className="mr-3" />
                        <span className="text-base font-normal">Groups</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <BookmarkOutlined className="mr-3" />
                        <span className="text-base font-normal">Bookmarks</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <HelpOutlineOutlined className="mr-3" />
                        <span className="text-base font-normal">Questions</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <WorkOutlineOutlined className="mr-3" />
                        <span className="text-base font-normal">Jobs</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <Event className="mr-3" />
                        <span className="text-base font-normal">Events</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <School className="mr-3" />
                        <span className="text-base font-normal">Courses</span>
                    </li>
                </ul>
                <button className=" w-[9.3rem] border-none p-2 rounded-md font-medium bg-gray-300">Show More</button>
                <hr className="mt-5 mb-5" />
                <ul className="p-0 m-0 list-none">
                    {user?.followers?.map(userId => <CloseFriend key={userId} userId={userId} />)}
                </ul>
            </div>
        </div>
    )
}

export default SideBar;