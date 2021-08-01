import axios from 'axios';
import { baseURL } from './config';

const endpoint = '/comments';

const get = (id) => {
  return axios.get(baseURL + endpoint + '/' + id);
};

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
  get,
  add,
  update,
  remove,
};
