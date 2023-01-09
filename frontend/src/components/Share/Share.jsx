import { useContext, useState } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage"
import { FacebookCloneContext } from "../../context/FacebookContext";
import { postsApiRequests } from "../../services/apiCalls";
import storage from "../../firebase";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import "./Share.css";

const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user, setPosts } = useContext(FacebookCloneContext);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");

    const share = async () => {
        const fileName = new Date().getTime() + file;
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
                const postDetails = {
                    description: description,
                    media: url
                };
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
                postsApiRequests.create(postDetails, accessToken).then(response => {
                    console.log("post uploaded: ", response);
                    if (response.status === 201) {
                        window.alert("Post Done");
                    }
                    else {
                        window.alert("Something went wrong.");
                    }
                });

            })
        });
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user?.profilePictureUrl || PF + "person/noAvatar.png"} alt="" className="shareProfileImage" />
                    <input
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder={`What's in your mind ${user?.username}?`}
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                type="file"
                                value={file}
                                onChange={(event) => setFile(event.target.files[0])}
                            />
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" onClick={share}>Share</button>
                </div>
            </div>
        </div>
    )
}

export default Share;