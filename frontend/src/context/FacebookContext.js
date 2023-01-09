import React from "react";
import { useState } from "react";

const FacebookCloneContext = React.createContext();

const FacebookCloneProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [posts, setPosts] = useState([]);

    return (
        <FacebookCloneContext.Provider
            value={{
                user,
                posts,
                setUser,
                setPosts
            }}
        >
            {children}
        </FacebookCloneContext.Provider>
    )
}

export { FacebookCloneContext, FacebookCloneProvider };