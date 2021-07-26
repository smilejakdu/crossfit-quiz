import axios from 'axios';
import { baseURL } from './config';
// const baseURL = 'http://localhost:4002';

const endpoint = '/comments';

const getAll = (params) => {
  return axios.get(baseURL + endpoint, params);
};

// const get = (id) => {
//   return axios.get(baseURL + endpoint + '/quiz/' + id);
// };

const add = (data) => {
  return axios.post(baseURL + endpoint, data);
};

const update = (data) => {
  return axios.patch(baseURL + endpoint + '/' + data.id, data);
};

const remove = (id) => {
  return axios.delete(baseURL + endpoint + '/' + id);
};

export const commentService = {
  getAll,
  // get,
  add,
  update,
  remove,
};
