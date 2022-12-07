import axios from "axios";

const baseUrl = "http://localhost:5000";
const api = axios.create()

// authentication api calls
export const authenticationApiCalls = {
    register: (signupDetails) => api.post(baseUrl + "/authentication/register", signupDetails),
    login: (signinDetails) => api.post(baseUrl + "/authentication/login", signinDetails)
}

// users api calls
export const usersApiCalls = {
    update: (userDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(baseUrl + "/users/update", userDetails);
    },
    updatePassword: (newPassword, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(baseUrl + "/users/updatePassword", newPassword);
    },
    delete: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.delete(baseUrl + "/users/delete");
    },
    getUserByUsername: (query) => {
        return api.get(baseUrl + `/users/search?query=${query}`);
    },
    getUserById: (userId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(baseUrl + `/user/${userId}`);
    },
    follow: (userId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(baseUrl + `/follow/${userId}`);
    },
    unFollow: (userId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(baseUrl + `/unfollow/${userId}`);
    }
}

// post api calls
export const postsApiCalls = {
    create: (postDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.post(baseUrl + "/posts/create", postDetails);
    },
    update: (postDetails, postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(baseUrl + `/posts/update/${postId}`, postDetails);
    },
    delete: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.delete(baseUrl + `/posts/delete/${postId}`);
    },
    like: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(baseUrl + `/posts/like/${postId}`);
    },
    heart: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(baseUrl + `/posts/heart/${postId}`);
    },
    getTimelinePosts: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(baseUrl + "/posts/timeline");
    },
    getAllPosts: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(baseUrl + "/posts/allPosts");
    },
    getPost: (postId) => api.get(baseUrl + `/posts/${postId}`)
}

// comments api calls
export const commentsApiCalls = {
    add: (postId, commentDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.post(baseUrl + `/comments/add/${postId}`, commentDetails);
    },
    delete: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.delete(baseUrl + `/comments/${postId}`);
    },
    getComments: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(baseUrl + `/comments/${postId}`);
    },
    reply: (commentId, replyDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.post(baseUrl + `/comments/reply/${commentId}`, replyDetails);
    },
    like: (commentId, type, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        if (type === "main") {
            return api.put(baseUrl + `/comments/like/${commentId}`);
        }
        else if (type === "reply") {
            return api.put(baseUrl + `/comments/reply/like/${commentId}`)
        }
    },
    heart: (commentId, type, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        if (type === "main") {
            return api.put(baseUrl + `/comments/heart/${commentId}`);
        }
        else if (type === "reply") {
            return api.put(baseUrl + `/comments/reply/heart/${commentId}`);
        }
    }
}