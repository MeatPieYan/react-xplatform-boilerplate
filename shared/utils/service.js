import { request, get, post } from './fetch';
import { getServerHost } from './utils';

const loadData = (path, method = 'post', data = {}) => {
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

const commonService = async (domain, options) => {
  const host = getServerHost(domain);
  options.host = host;

  if (domain.toLowerCase() === 'php') {
    options['Content-Type'] = 'application/x-www-form-urlencoded';
  } else if (domain.toLowerCase() === 'commongw') {
    options['Content-Type'] = 'application/json;charset=UTF-8';
  } else {
    options['Content-Type'] = 'application/json';
  }

  console.log(`commonService ${options.path} with data --> ${JSON.stringify(options.data)}`);
  const result = await request(options);
  console.log(`commonService ${options.path} response --> ${JSON.stringify(result)}`);
  return result;
};

export default {
  loadData,
  commonService
};
