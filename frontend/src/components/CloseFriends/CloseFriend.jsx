import "./CloseFriend.css";

const CloseFriend = ({ user }) => {
    return (
        <li className="sidebarFriend">
            <img src={user.profilePicture} alt="" className="sidebarFriendImage" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default CloseFriend