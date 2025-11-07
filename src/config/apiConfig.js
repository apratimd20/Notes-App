// const url = 'http://localhost:5000/api';  //local development

const url = import.meta.env.VITE_BACKEND_URL

const apiConfig = {
  baseUrl: url,
  register: `${url}/auth/register`,
  login: `${url}/auth/login`,

  notes: `${url}/notes`,
  note: (id) => `${url}/notes/${id}`,
};

export default apiConfig;
