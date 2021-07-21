import axios from 'axios';
import { baseURL } from './config';

const endpoint = '/cards';

const getAll = (params) => {
  return axios.get(baseURL + endpoint, params);
};

const get = (id) => {
  return axios.get(baseURL + endpoint + '/' + id);
};

const add = (data) => {
  console.log('card data confirm :', data);
  return axios.post(baseURL + endpoint, data);
};

const update = (data) => {
  return axios.patch(baseURL + endpoint + '/' + data.id, data);
};

const remove = (id) => {
  return axios.delete(baseURL + endpoint + '/' + id);
};

export const cardService = {
  getAll,
  get,
  add,
  update,
  remove,
};
