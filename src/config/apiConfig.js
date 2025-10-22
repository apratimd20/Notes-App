const url = 'http://localhost:5000/api';

const apiConfig = {
  baseUrl: url,
  register: `${url}/auth/register`,
  login: `${url}/auth/login`,
};

export default apiConfig;
