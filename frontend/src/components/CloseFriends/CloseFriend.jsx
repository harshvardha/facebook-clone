

const CloseFriend = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="flex items-center mb-[0.9375rem]">
            <img src={PF + user.profilePicture} alt="" className="w-8 h-8 rounded-full object-cover mr-[0.625rem]" />
            <span className="font-medium">{user.username}</span>
        </li>
    )
}

export default CloseFriend