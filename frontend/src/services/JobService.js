import axios from 'axios';

const JOB_API_BASE_URL = "http://localhost:8080/api/v1/jobs";

class JobService {

    getJobs(params) {
        for (let key in params) {
            if (params[key] === '— —') {
                delete params[key];
            }
        }
        return axios.get(JOB_API_BASE_URL, {params});
    }

    getFilters() {
        return axios.get(JOB_API_BASE_URL + '/filters');
    }
}

export default new JobService();
