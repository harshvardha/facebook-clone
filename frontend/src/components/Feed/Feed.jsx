import { useEffect, useState } from "react";
import axios from "axios";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { Posts } from "../../dummyData";

const Feed = ({ username }) => {
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = username ? await axios.get("/posts/allPosts") : await axios.get("/posts/timeline");
    //         setPosts(res.data);
    //     }
    //     fetchData();
    // }, [])

    return (
        <div className="flex-[5.5]">
            <div className="p-5">
                <Share />
                {Posts.map(post => <Post key={post.id} post={post} />)}
            </div>
        </div>
    )
}

export default Feed;