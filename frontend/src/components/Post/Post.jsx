import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler = (event) => {
        setIsLiked(prevState => !prevState);
        setLikes(isLiked ? likes + 1 : likes - 1);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`/users/${post.userId}`);
            setUser(res.data);
        }
        fetchData();
    }, [])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture || PF + "person/noAvatar.png"} alt="" className="postProfileImage" />
                            <span className="postUsername">{user.username}</span>
                        </Link>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.image} alt="" className="postImage" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likeHandler} />
                        <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{likes}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;