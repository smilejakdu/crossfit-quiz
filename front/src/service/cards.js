import axios from 'axios';
import { baseURL } from './config';

const endpoint = '/cards';

const getAll = (params) => {
  return axios.get(baseURL + endpoint, params);
};

const add = (data) => {
  console.log('card data confirm :', data);
  return axios.post(baseURL + endpoint, data);
};

const update = (data) => {
  return axios.put(baseURL + endpoint + '/', data);
};

const remove = (id) => {
  return axios.delete(baseURL + endpoint + '/' + id);
};

export const cardService = {
  getAll,
  add,
  update,
  remove,
};
