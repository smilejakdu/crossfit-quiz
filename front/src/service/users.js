import axios from 'axios';
import { baseURL } from './config';
const endpoint = '/users';

const get = (id) => {
  return axios.get(baseURL + endpoint + '/' + id);
};

const login = (data) => {
  console.log('login data : ', data);
  axios
    .post(baseURL + endpoint, data)
    .then((res) => console.log('login result : ', res))
    .catch((err) => {
      console.log('login error : ', err);
    });
};

export const userService = {
  get,
  login,
};
