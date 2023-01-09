import { MoreVert } from "@mui/icons-material";
import { userApiRequests, postsApiRequests } from "../../services/apiCalls";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeDislikeHandler = () => {
        setIsLiked(prevState => !prevState);
        setLikes(isLiked ? likes + 1 : likes !== 0 ? likes - 1 : 0);
    }

    const likeDislikeRegistrar = async (event) => {
        try {
            const accessToken = localStorage.getItem("ACCESS_TOKEN");
            const response = await postsApiRequests.like(post._id, accessToken);
            console.log(response);
            if (response.status === 200) {
                likeDislikeHandler();
            }
            else {
                throw Error("like or dislike not registered");
            }
        } catch (error) {
            console.log(error);
            window.alert("Something went wrong.");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
                const response = await userApiRequests.getUserById(accessToken, post.userId);
                console.log(response);
                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log(error);
                window.alert("Something went wrong.");
            }
        }
        fetchData();
    }, [userApiRequests.getUserById, post])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user?.username}`} style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }}>
                            <img src={user.profilePicture || PF + "person/noAvatar.png"} alt="" className="postProfileImage" />
                            <span className="postUsername">{user?.username}</span>
                        </Link>
                        <span className="postDate">{format(post?.createdAt)}</span>
                    </div>
                    <div className="postTopRight" style={{ cursor: "pointer" }}>
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.description}</span>
                    <img src={post?.media} alt="" className="postImage" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likeDislikeRegistrar} />
                        <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeDislikeRegistrar} />
                        <span className="postLikeCounter">{likes}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{10} Comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;