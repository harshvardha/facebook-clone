import React from "react";
import { useState } from "react";

const FacebookCloneContext = React.createContext();

const FacebookCloneProvider = ({ children }) => {
    const [user, setUser] = useState("");

    return (
        <FacebookCloneContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </FacebookCloneContext.Provider>
    )
}

export { FacebookCloneContext, FacebookCloneProvider };