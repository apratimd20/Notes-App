// const url = 'http://localhost:5000/api';  //local development
const url = process.env.Backend_URL;

const apiConfig = {
  baseUrl: url,
  register: `${url}/auth/register`,
  login: `${url}/auth/login`,
};

export default apiConfig;
