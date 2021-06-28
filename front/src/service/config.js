import axios from 'axios';

export const baseURL =
  'https://2b6fbe78-59aa-4d4e-934d-3326efa9c65e.mock.pstmn.io';

const endpoint = '/cards';

const getAll = (params) => {
  return axios.get(baseURL + endpoint, params);
};

const add = (data) => {
  return axios.post(baseURL + endpoint, data);
};

const update = (id, data) => {
  return axios.patch(baseURL + endpoint + '/' + id, data);
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
