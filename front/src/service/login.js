import axios from 'axios';
import { baseURL } from './config';

const endpoint = '/users';

export const loginRequest = (data) => {
  console.log('data : ', data);
  axios
    .post(baseURL + endpoint, data)
    .then((res) => console.log('result : ', res))
    .catch((err) => {
      console.log('error : ', err);
    });
};
