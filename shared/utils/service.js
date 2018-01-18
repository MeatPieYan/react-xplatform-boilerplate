import { request } from './fetch';
import { service } from '../../config';

const loadData = (path, method = 'post', data = {}) => {
  const options = {
    path,
    type: method,
    data
  };

  return request(options);
};

const sendUserAction = (env = 'dev', data = {}) => {
  const { domain } = service[env].userAction;

  return loadData(`${domain}/userAction/create`, 'post', data);
};

export default {
  loadData,
  sendUserAction
};
