import { Users } from "../../dummyData";
import Online from "../Online/Online";
import "./RightBar.css";

const RightBar = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightBar = () => {
        return (
            <>
                <div className="flex items-center">
                    <img src={`${PF}gift.png`} alt="" className="w-10 h-10 mr-[0.625rem]" />
                    <span className="font-light text-[0.9375rem]"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.</span>
                </div>
                <img src={`${PF}ad.png`} alt="" className="w-full rounded-[0.625rem] mt-[1.875rem] mb-[1.875rem]" />
                <h4 className="mb-[0.875rem] text-lg font-medium">Online Friends</h4>
                <ul className="p-0 m-0 list-none">
                    {Users.map(user => <Online key={user.id} user={user} />)}
                </ul>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                <h4 className="mb-[0.875rem] text-lg font-medium">User information</h4>
                <div className="mb-[1.875rem]">
                    <div className="mb-[0.875rem]">
                        <span className="font-medium mr-[0.3125rem] text-[#555]">City:</span>
                        <span className="font-light">{user?.city}</span>
                    </div>
                    <div className="mb-[0.875rem]">
                        <span className="font-medium mr-[0.3125rem]">From:</span>
                        <span className="font-light">{user?.from}</span>
                    </div>
                    <div className="mb-[0.875rem]">
                        <span className="font-medium mr-[0.3125rem]">Relationship:</span>
                        <span className="font-light">{user?.relationship === 1 ? "Single" : user?.relationship === 2 ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="text-lg font-medium mb-[0.625rem]">User friends</h4>
                <div className="flex flex-wrap justify-between">
                    <div className="flex flex-col mb-5 cursor-pointer">
                        <img src={`${PF}person/1.jpeg`} alt="" className=" w-[6.25rem] h-[6.25rem] object-cover rounded-md" />
                        <span className="">{user?.username}</span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="flex-[3.5] p-5">
            <div className="pt-5 pr-5">
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}

export default RightBar;