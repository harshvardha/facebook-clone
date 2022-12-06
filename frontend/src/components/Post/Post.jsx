import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { Users } from "../../dummyData";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler = (event) => {
        setIsLiked(prevState => !prevState);
        setLikes(isLiked ? likes + 1 : likes - 1);
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await axios.get(`/users/${post.userId}`);
    //         setUser(res.data);
    //     }
    //     fetchData();
    // }, [])

    return (
        <div className="w-full rounded-xl webkit-box-shadow mt-8 mb-8">
            <div className="p-[0.62rem]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center">
                        <Link to={`/profile`} className="flex items-center">
                            <img src={PF + Users[post.userId - 1].profilePicture || PF + "person/noAvatar.png"} alt="" className="w-8 h-8 rounded-full object-cover" />
                            <span className="text-[0.93rem] font-medium ml-3 mr-3">{Users[post.userId - 1].username}</span>
                        </Link>
                        <span className="text-xs">{post.date}</span>
                    </div>
                    <div className="cursor-pointer">
                        <MoreVert />
                    </div>
                </div>
                <div className="mt-5 mb-5">
                    <span className="">{post.desc}</span>
                    <img src={PF + post.photo} alt="" className="mt-5 w-full max-h-[31.25rem] object-contain" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <img src={`${PF}like.png`} alt="" className="w-6 h-6 cursor-pointer" onClick={likeHandler} />
                        <span className=" text-[0.93rem]">{likes}</span>
                        <img src={`${PF}heart.png`} alt="" className="w-6 h-6 cursor-pointer" onClick={likeHandler} />
                        <span className=" text-[0.93rem]">{likes}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="cursor-pointer border-b border-dashed border-gray-500 text-sm">{post.comment} Comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;