import axios from "axios";

const baseUrl = "http://localhost:5000/api"
const api = axios.create();

// api request for authentication
export const authenticationApiRequests = {
    register: (registerDetails) => api.post(`${baseUrl}/authentication/register`, registerDetails),
    login: (loginDetails) => api.post(`${baseUrl}/authentication/login`, loginDetails)
};

// api requests for users
export const userApiRequests = {
    updateUser: (userDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/users/update`, userDetails);
    },
    updatePassword: (newPassword, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/users/updatePassword`, newPassword);
    },
    follow: (userId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/users/follow/${userId}`);
    },
    unFollow: (userId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/users/unfollow/${userId}`);
    },
    search: (username) => api.get(`${baseUrl}/users/search?query=${username}`),
    getUserById: (accessToken, userId) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(`${baseUrl}/users/user/${userId}`);
    },
    delete: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.delete(`${baseUrl}/users/delete`);
    }
}

// api requests for posts
export const postsApiRequests = {
    create: (postDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.post(`${baseUrl}/posts/create`, postDetails);
    },
    update: (postId, updateDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/posts/update/${postId}`, updateDetails);
    },
    delete: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.delete(`${baseUrl}/posts/delete/${postId}`);
    },
    like: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/posts/like/${postId}`);
    },
    getTimelinePosts: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(`${baseUrl}/posts/timeline`);
    },
    getAllPosts: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(`${baseUrl}/posts/allPosts`);
    },
    getPostById: (postId) => api.get(`${baseUrl}/posts/${postId}`)
}