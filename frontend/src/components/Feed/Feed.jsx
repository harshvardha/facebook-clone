import { useEffect, useState } from "react";
import axios from "axios";
import Share from "../Share/Share";
import Post from "../Post/Post";
import "./Feed.css";

const Feed = ({username}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = username ? await axios.get("/posts/allPosts") : await axios.get("/posts/timeline");
            setPosts(res.data);
        }
        fetchData();
    }, [])

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map(post => <Post key={post._id} post={post} />)}
            </div>
        </div>
    )
}

export default Feed;