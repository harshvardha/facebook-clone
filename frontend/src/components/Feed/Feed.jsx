import { useEffect, useState, useContext } from "react";
import { postsApiRequests } from "../../services/apiCalls";
import { FacebookCloneContext } from "../../context/FacebookContext";
import Share from "../Share/Share";
import Post from "../Post/Post";
import "./Feed.css";

const Feed = ({ profilePage = false }) => {
    const { posts, setPosts } = useContext(FacebookCloneContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
                const response = profilePage ? await postsApiRequests.getAllPosts(accessToken) : await postsApiRequests.getTimelinePosts(accessToken);
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
    }, [postsApiRequests.getTimelinePosts, profilePage]);

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