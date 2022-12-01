import React, { useReducer } from "react";
import AuthReducer from "./AuthReducers";

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false
};

const AuthContext = React.createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };