import axios from "axios";

// eslint-disable-next-line
export default {
    registerUser: function (userData) {
        return axios.post("/api/users/register", userData);
    },
    loginUser: function (userData) {
        return axios.post("/api/users/login", userData);
    },
    getAllUrls: function (data) {
        return axios.post("/api/urls", data);
    },
    newUrl: function (data) {
        return axios.post("/api/urls/newUrl", data);
    },
    clickShortCode: function (shortCode) {
        return axios.post("/api/urls/" + shortCode);
    },
    generateCode: function() {
        return axios.post("/api/urls/generateCode");
    },
    getStats: function(shortCode) {
        return axios.get("/api/urls/" + shortCode)
    }
}