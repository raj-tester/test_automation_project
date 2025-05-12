const BASE_URL = 'http://localhost:5001/api';

class APIHelper {
  constructor(request) {
    this.request = request;
  }

  async signup(email, password) {
    const response = await this.request.post(`${BASE_URL}/signup`, {
      data: { email, password }
    });
    return response;
  }

  async login(email, password) {
    const response = await this.request.post(`${BASE_URL}/login`, {
      data: { email, password }
    });
    return response;
  }

  async logout() {
    const response = await this.request.post(`${BASE_URL}/logout`);
    return response;
  }

  async getMe() {
    const response = await this.request.get(`${BASE_URL}/me`);
    return response;
  }
}

module.exports = APIHelper; 