import axios from 'axios';
// import { baseURL } from './config';
const baseURL = 'http://localhost:4001';

const endpoint = '/quizzes';

const getAll = () => {
  return axios.get(baseURL + endpoint);
};

// const getAll = (filteringId = 0) => {
//   return axios.get(baseURL + endpoint + '/sort/' + filteringId);
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

export const quizService = {
  getAll,
  // get,
  add,
  update,
  remove,
};
