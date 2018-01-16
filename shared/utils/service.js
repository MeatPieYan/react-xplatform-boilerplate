import { request } from './fetch';

const loadData = (path, method = 'post', data = {}) => {
  const options = {
    path,
    type: method,
    data
  };

  return request(options);
};

export default {
  loadData
};
