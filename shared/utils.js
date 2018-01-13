import config from '../config/serviceConfig';

const getServerHost = (serverName) => {
  return config['test'][serverName].domain;
};

export default {
  getServerHost
};
