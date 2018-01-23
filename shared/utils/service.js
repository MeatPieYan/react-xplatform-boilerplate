import { request, get } from './fetch';
import { service } from '../../config';

const loadData = (path, method = 'post', data = {}) => {
  const options = {
    path,
    method,
    data
  };

  return request(options);
};

const sendUserAction = (env = 'dev', data = {}) => {
  const { domain } = service[env].userAction;

  return loadData(`${domain}/userAction/create4h5`, 'post', data);
};

const loadNodeEnv = () => get('/env');

export default {
  loadData,
  sendUserAction,
  loadNodeEnv
};
