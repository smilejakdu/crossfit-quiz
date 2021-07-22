import axios from 'axios';
// import { baseURL } from './config';
const baseURL = 'http://localhost:4003';

const endpoint = '/users';

const get = (id) => {
  return axios.get(baseURL + endpoint + '/' + id);
};

const add = (data) => {
  return axios.post(baseURL + endpoint, data);
};

export const userService = {
  get,
  add,
};
