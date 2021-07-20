import axios from 'axios';
// import { baseURL } from './config';
const baseURL = 'http://localhost:4001';

const endpoint = '/quizzes';

const getAll = (params) => {
  return axios.get(baseURL + endpoint, params);
};

const get = (id) => {
  return axios.get(baseURL + endpoint + '/' + id);
};

const add = (data) => {
  console.log('quiz data confirm :', data);
  return axios.post(baseURL + endpoint, data);
};

const update = (data) => {
  return axios.put(baseURL + endpoint + '/', data);
};

const remove = (id) => {
  return axios.delete(baseURL + endpoint + '/' + id);
};

export const quizService = {
  getAll,
  get,
  add,
  update,
  remove,
};
