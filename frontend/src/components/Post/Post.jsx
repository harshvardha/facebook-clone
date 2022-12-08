import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; \
import { postsApiCalls } from "../../apiCalls";

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post.like.length);
    const [hearts, setHeart] = useState(post.hearts.length)
    const [isLiked, setIsLiked] = useState(false);
    const [isHearted, setIsHearted] = useState(false);
    // const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem("ACCESS_TOKEN");
            const response = await postsApiCalls.like(post._id, accessToken);
            if (response.status === 200) {
                setIsLiked(prevState => !prevState);
                setLikes(isLiked ? likes + 1 : likes - 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const heartHandler = async (event) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem("ACCESS_TOKEN");
            const response = await postsApiCalls.heart(post._id, accessToken);
            if (response.status === 200) {
                setIsHearted(prevState => !prevState);
                setHeart(isHearted ? hearts + 1 : hearts - 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full rounded-xl webkit-box-shadow mt-8 mb-8">
            <div className="p-[0.62rem]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center">
                        <Link to={`/profile`} className="flex items-center">
                            <img src={post?.image || PF + "person/noAvatar.png"} alt="" className="w-8 h-8 rounded-full object-cover" />
                            <span className="text-[0.93rem] font-medium ml-3 mr-3">{post?.userId?.username}</span>
                        </Link>
                        <span className="text-xs">{format(post?.createdAt)}</span>
                    </div>
                    <div className="cursor-pointer">
                        <MoreVert />
                    </div>
                </div>
                <div className="mt-5 mb-5">
                    <span className="">{post?.description}</span>
                    <img src={post?.image} alt="" className="mt-5 w-full max-h-[31.25rem] object-contain" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <img src={`${PF}like.png`} alt="" className="w-6 h-6 cursor-pointer" onClick={likeHandler} />
                        <span className=" text-[0.93rem]">{likes}</span>
                        <img src={`${PF}heart.png`} alt="" className="w-6 h-6 cursor-pointer" onClick={heartHandler} />
                        <span className=" text-[0.93rem]">{hearts}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="cursor-pointer border-b border-dashed border-gray-500 text-sm">{post?.comments?.length} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;