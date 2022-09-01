import axios from 'axios';

class BaseService {
  static async fetchData() {
    const response = await axios.get('https://randomuser.me/api/?results=50', {
      timeout: 2000,
    });
    return response;
  }
}

export default BaseService;
