const Online = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="flex items-center mb-[0.93rem]">
            <div className="mr-[0.625rem] relative">
                <img src={PF + user?.profilePicture || PF + "person/noAvatar.png"} alt="" className="w-10 h-10 rounded-full object-cover" />
                <span className="w-3 h-3 rounded-full bg-lime-500 absolute -top-[0.125rem] right-0 border-[0.125rem] border-solid border-white" />
            </div>
            <span className="font-medium">{user?.username}</span>
        </li>
    )
}

export default Online;