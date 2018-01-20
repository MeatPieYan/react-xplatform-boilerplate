/* global fetch */

require('isomorphic-fetch');

const LOCAL_HOST = '127.0.0.1';
const LOCAL_PORT = process.env.port || 8080;

const Local = {
  host: LOCAL_HOST,
  port: LOCAL_PORT,
  domain: `http://${LOCAL_HOST}${LOCAL_PORT}`
};

function request(options) {
  const defaults = {
    host: null,
    path: null,
    method: 'POST',
    data: {},
    'Content-Type': 'application/json'
  };
  let url;
  const headers = {};

  options = Object.assign({}, defaults, options);

  const isNode = typeof window === 'undefined';

  if (isNode && options.host === null) {
    url = Local.domain + options.path;
  } else {
    url = options.host === null ? options.path : options.host + options.path;
  }

  Object.keys(options).forEach((key) => {
    if (!key.match(/url|method|data|host/)) {
      headers[key] = options[key];
    }
  });
  console.log(`fetch url: ${url} width data: ${JSON.stringify({
    method: options.method,
    body: JSON.stringify(options.data),
    headers
  })}`);

  return fetch(url, {
    method: options.method,
    body: options.method.toLowerCase() === 'post' ? JSON.stringify(options.data) : {},
    headers,
    credentials: 'include'
  }).then((res) => {
    return options.method.toLowerCase() === 'post' ? res.json() : res.text();
  });
}

const get = path => request({
  path,
  method: 'GET'
});

const post = (path, data) => request({
  path,
  data,
  method: 'POST'
});

export default {
  request,
  get,
  post
};
