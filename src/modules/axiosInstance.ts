import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:27017',
  baseURL: 'https://rs-react-learnwords.herokuapp.com',
});
