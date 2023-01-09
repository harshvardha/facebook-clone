import "./CloseFriend.css";

const CloseFriend = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    console.log(user);

    return (
        <li className="sidebarFriend">
            <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="sidebarFriendImage" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default CloseFriend