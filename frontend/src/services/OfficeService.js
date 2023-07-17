import axios from 'axios';

const OFFICE_API_BASE_URL = "http://localhost:8080/api/v1/offices";

class OfficeService {

    getOffices() {
        return axios.get(OFFICE_API_BASE_URL);
    }
}

export default new OfficeService();
