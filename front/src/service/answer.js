import axios from 'axios';
import { baseURL } from './config';
const endpoint = '/quizzes_answer';

const add = (data) => {
  return axios.post(baseURL + endpoint, data);
};

export const answerService = {
  add,
};
