import { useEffect, useState } from "react";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { Posts } from "../../dummyData";
import { postsApiCalls } from "../../apiCalls";

const Feed = ({ username }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
                const response = username ? await postsApiCalls.getAllPosts(accessToken) : await postsApiCalls.getTimelinePosts(accessToken);
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="flex-[5.5]">
            <div className="p-5">
                <Share />
                {posts.map(post => <Post key={post.id} post={post} />)}
            </div>
        </div>
    )
}

export default Feed;