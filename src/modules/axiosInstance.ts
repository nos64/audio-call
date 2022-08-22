import axios from 'axios';
import { baseURL } from './types';

export default axios.create({
  // baseURL: 'http://localhost:27017',
  baseURL,
});
