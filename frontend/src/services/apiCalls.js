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
        return api.put(`${baseUrl}/api/users/update`, userDetails);
    },
    updatePassword: (newPassword, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/api/users/updatePassword`, newPassword);
    },
    follow: (userId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/api/users/follow/${userId}`);
    },
    unFollow: (userId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/api/users/unfollow/${userId}`);
    },
    search: (username) => api.get(`${baseUrl}/api/users/search?query=${username}`),
    delete: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.delete(`${baseUrl}/api/users/delete`);
    }
}

// api requests for posts
export const postsApiRequests = {
    create: (postDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.post(`${baseUrl}/api/posts/create`, postDetails);
    },
    update: (postId, updateDetails, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/api/posts/update/${postId}`, updateDetails);
    },
    delete: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.delete(`${baseUrl}/api/posts/delete/${postId}`);
    },
    like: (postId, accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/api/posts/like/${postId}`);
    },
    getTimelinePosts: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(`${baseUrl}/api/posts/timeline`);
    },
    getAllPosts: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
        return api.get(`${baseUrl}/api/posts/allPosts`);
    },
    getPostById: (postId) => api.get(`${baseUrl}/api/posts/${postId}`)
}