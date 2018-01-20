/* eslint-env browser */

const getCookie = (name) => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return null;
};

const generateCookieKey = () => `${Date.now()}/${Math.random()}`;


const setCookie = (key, value) => {
  document.cookie = `${key}=${escape(value)}`;
};

const getSessionKey = () => {
  let cookieKey = getCookie('__session_key__');

  if (!cookieKey || cookieKey === '') {
    cookieKey = generateCookieKey();
    setCookie('__session_key__', cookieKey);
  }

  return cookieKey;
};

const loadThirdPartyScript = (src, onReady) => {
  const script = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];
  let loaded;

  script.src = src;

  script.onload = script.onreadystatechange = () => {
    if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
      script.onload = script.onreadystatechange = null;
      loaded = true;

      if (typeof onReady === 'function') {
        onReady();
      }
    }
  };

  head.appendChild(script);
};

const getXPath = (element) => {
  if (element.id !== '') {
    return `//*[@id="${element.id}"]`;
  }

  if (element === document.body) { // 递归到body处，结束递归
    return `/html/${element.tagName.toLowerCase()}`;
  }

  let ix = 0; // 在nodelist中的位置，且每次点击初始化
  const siblings = element.parentNode.childNodes; // 同级的子元素

  for (let i = 0, l = siblings.length; i < l; i += 1) {
    const sibling = siblings[i];
    if (sibling === element) { // 如果这个元素是siblings数组中的元素，则执行递归操作
      return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}${(ix + 1) === 1 ? '' : `[${ix + 1}]`}`;
    } else if (sibling.nodeType === 1 && sibling.tagName === element.tagName) { // 如果不符合，判断是否是element元素，并且是否是相同元素，如果是相同的就开始累加
      ix += 1;
    }
  }
};

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createRequestTypes = base => [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
  acc[type] = `${base}_${type}`;
  return acc;
}, {});

export default {
  loadThirdPartyScript,
  getXPath,
  createRequestTypes,
  getCookie,
  setCookie,
  getSessionKey
};
