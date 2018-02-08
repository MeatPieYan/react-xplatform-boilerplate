/* eslint-env browser */
/* global fetch */
require('isomorphic-fetch');

const envConfig = '/api/common/logRecord';

function snedLogToJave(envUrl, data) {
  fetch(envUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function getBrief(brief) {
  const base = Object.keys(brief).find(item => brief[item]);
  return base.substr(base.indexOf('is') + 2);
}

class Log {
  constructor(env, clientInfo) {
    this.env = env;
    this.clientInfo = clientInfo;
  }

  initLog() {
    if (typeof window === 'undefined') {
      return;
    }

    /**
    *  '错误信息：', errorMessage
    *  '出错文件：', scriptURI
    *  '出错行号：', lineNumber
    *  '出错列号：', columnNumber
    *  '错误详情：', errorObj
    */
    window.onerror = (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) => {
      const { env, clientInfo } = this;
      const envUrl = envConfig;
      console.log('get it');

      const _clientInfo = JSON.parse(JSON.stringify(clientInfo.client));
      const { brief } = _clientInfo;
      const platform = getBrief(brief);

      delete _clientInfo.brief;
      delete _clientInfo.search;

      const data = {
        level: 'ERROR',
        topic: `${clientInfo.pageName}-${env}-${platform}`,
        message: {
          errorMessage,
          scriptURI,
          row: lineNumber,
          col: columnNumber,
          _clientInfo
        }
      };

      snedLogToJave(envUrl, data);
    };
  }
}


export default Log;
