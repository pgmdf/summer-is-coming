import axios from "axios";

export const signup = (username, password) => {
  return axios.post('/api/signup', { username, password })
    .then(response => response.data)
}
