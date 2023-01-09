import { useEffect, useState } from "react";
import { postsApiRequests } from "../../services/apiCalls";
import Share from "../Share/Share";
import Post from "../Post/Post";
import "./Feed.css";

const Feed = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
                const response = await postsApiRequests.getTimelinePosts(accessToken);
                console.log(response);
                if (response.status === 200) {
                    setPosts(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                window.alert("Something went wrong.");
            }
        }
        fetchPosts();
    }, [postsApiRequests.getTimelinePosts]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {!isLoading && posts.map(post => <Post key={post._id} post={post} />)}
            </div>
        </div>
    )
}

export default Feed;