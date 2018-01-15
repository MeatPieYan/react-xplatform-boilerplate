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

const commonService = async (domain, path, method, data) => {
  console.log(domain, path, method, data);
  const host = getServerHost(domain);
  const options = {
    host,
    path,
    method,
    data
  };

  if (domain.toLowerCase() === 'php') {
    options['Content-Type'] = 'application/x-www-form-urlencoded';
  } else {
    options['Content-Type'] = 'application/json';
  }

  console.log(`commonService ${path} with data --> ${JSON.stringify(data)}`);
  const result = await request(options);
  console.log(`commonService ${path} response --> ${JSON.stringify(result)}`);
  return result;
};

const commonGWService = async (path, method, data) => {
  const host = getServerHost('commongw');
  const options = {
    host,
    path,
    data,
    method,
    'Content-Type': 'application/json;charset=UTF-8'
  };

  console.log(`commonGWService ${path} with data --> ${JSON.stringify(data)}`);
  const result = await request(options);
  console.log(`commonGWService ${path} response --> ${JSON.stringify(result)}`);
  return result;
};

export default {
  loadData,
  commonGWService,
  commonService
};
