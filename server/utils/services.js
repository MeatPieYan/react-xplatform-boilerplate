const { getServerHost } = require('./utils');
const { request } = require('../../shared/utils/fetch');

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

module.exports = {
  commonService
};
