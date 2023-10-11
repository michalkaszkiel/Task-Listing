import axios from "axios";

const createApiInstance = (token) => {
    return axios.create({
        baseURL: "https://task-list-crud2.onrender.com/api/task-list",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default createApiInstance;
