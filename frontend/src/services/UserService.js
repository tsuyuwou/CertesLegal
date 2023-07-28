import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/user/";

class UserService {

    authenticate(user) {
        return axios.post(USER_API_BASE_URL + 'auth', user);
    }

    applyToJob(userId, jobId) {
        return axios.post(USER_API_BASE_URL + userId, { jobId });
    }

    updateUser(id, data) {
        return axios.patch(USER_API_BASE_URL + id, data);
    }

    deleteUser(id) {
        return axios.delete(USER_API_BASE_URL + id);
    }
}

export default new UserService();
