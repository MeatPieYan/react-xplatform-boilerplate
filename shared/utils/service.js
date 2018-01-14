import { request, get, post } from './fetch';

export const loadData = (path, method = 'post', data = {}) => {
  const options = {
    path,
    type: method,
    data
  };

  return new Promise((resolve, reject) => {
    request(options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
