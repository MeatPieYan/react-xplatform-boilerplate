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

const normalizeDate = (date) => {
  if (typeof dete === 'string') {
    date = date.replace(/-/g, '/');
    date = new Date(date);
  }
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  if (date.toString() === 'Invalid Date') {
    return '';
  }
  return date;
};

/**
 * formate Date
 * @param {*} date 日期
 * @param {*} fmt  格式化样式 如：yyyy-MM-dd
 */
const formatDate = (date, fmt) => {
  const _date = normalizeDate(date);
  const o = {
    'M+': _date.getMonth() + 1, // 月份
    'd+': _date.getDate(), // 日
    'h+': _date.getHours(), // 小时
    'm+': _date.getMinutes(), // 分
    's+': _date.getSeconds(), // 秒
    'q+': Math.floor((_date.getMonth() + 3) / 3), // 季度
    S: _date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${_date.getFullYear()  }`).substr(4 - RegExp.$1.length));
  for (const k in o)
    {if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr((`${o[k]}`).length)));}
  return fmt;
};

// 姓名掩码
const maskName = (name) => {
  if (!name) return '';
  if (name.length > 2) {
    let starStr = '';
    for (let i = 0; i < name.length - 2; i + 1) {
      starStr += '*';
    }
    return name.substr(0, 1) + starStr + name.substring(name.length - 1);
  } else if (name.length === 2) {
    return `${name.substr(0, 1)}*`;
  }

  return name;
};

// 手机号掩码
const maskPhone = num => (`${num.substr(0, 3)}****${num.substr(7, 11)}`);

/**
 * 护照号，身份证号，通行证的掩码
 *
 * @param {*} cardno  证件号
 * @param {*} cardtype  证件类型 I/P/GA
 */
const maskCardNo = (cardno, cardtype = 'I') => {
  if (!cardno) return '';

  if (cardtype === 'P') {
    // cardno = cardno.substr(0, 4) + '*****';
    let str = '';
    for (let i = 0; i < cardno.length - 2; i + 1) {
      str += '*';
    }
    cardno = cardno.substr(0, 2) + str;
  } else if (cardtype === 'I') {
    if (cardno.length === 15) {
      cardno = `${cardno.substr(0, 3)}***********${cardno.substr(14, 1)}`;
    } else {
      cardno = `${cardno.substr(0, 3)}**************${cardno.substr(17, 1)}`;
    }
  } else if (cardtype === 'GA') {
    cardno = `${cardno.substr(0, 2)}****${cardno.substr(cardno.length - 2, 2)}`;
  }

  return cardno;
};

// 身份证获取性别/
const getBirthday = (code = '') => {
  let birthday = '';

  if (code.length === 15) {
    birthday = `19${code.substr(6, 6)}`;
  } else if (code.length === 18) {
    birthday = code.substr(6, 8);
  }
  if (birthday) {
    birthday = birthday.replace(/(.{4})(.{2})/, '$1/$2/');
  }
  return birthday;
};

// 身份证获取生日
const getGender = (code = '') => {
  let gender = '';
  if (code.length === 15) {
    gender = code.substr(14, 1);
  } else if (code.length === 18) {
    gender = code.substr(16, 1);
  }

  if (gender) {
    if (+gender % 2 === 1) {
      gender = 'M';
    } else {
      gender = 'F';
    }
  }
  return gender;
};

// 验证身份证号
const validateIdCardNo = (num) => {
  const error = {
    code: 1,
    msg: '请输入身份证号'
  };

  if (!num) {
    return error;
  }

  error.code = 2;
  error.msg = '身份证号格式不正确';

  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!(/^\d{17}([0-9]|X)$/.test(num))) {
    return error;
  }

  // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  // 下面分别分析出生日期和校验位
  const re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
  const arrSplit = num.match(re);

  // 检查生日日期是否正确
  const dtmBirth = new Date(`${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
  if (dtmBirth !== 'Invalid Date') {
    // 检验18位身份证的校验码是否正确。
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    let valnum = null;
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let nTemp = 0;
    for (let i = 0; i < 17; i++) {
      nTemp += num.substr(i, 1) * arrInt[i];
    }
    valnum = arrCh[nTemp % 11];
    if (valnum === num.substr(17, 1)) {
      error.code = 0;
      error.msg = '';
    }
  }

  return error;
};

/**
 * 验证护照号/港澳通行证
 *
 * @param {*} num  证件号
 * @param {*} type  证件类型 P/HK
 */
const validatePassport = (num, type = 'P') => {
  const error = {
    code: 1,
    msg: '请输入证件号'
  };

  if (!num) {
    return error;
  }

  const rule = type === 'P'
    ? /(P\d{7})|(G\d{8})/
    : /^[a-zA-Z0-9]{2,21}$/;

  error.code = 2;
  error.msg = '证件号格式不正确';

  if (rule.test(num)) {
    error.code = 0;
    error.msg = '';
  }

  return error;
};


// 验证手机号
const validatePhone = (num) => {
  const rule = /^1[0-9]{10}$/;
  return rule.test(num);
};


export default {
  loadThirdPartyScript,
  getXPath,
  createRequestTypes,
  getCookie,
  setCookie,
  getSessionKey,

  formatDate,
  maskName,
  maskPhone,
  maskCardNo,
  getBirthday,
  getGender,
  validateIdCardNo,
  validatePassport,
  validatePhone
};
