import config from '../config/serviceConfig';

const getServerHost = (serverName) => {
  return config['test'][serverName].domain;
};

const loadThirdPartyScript = (src, onReady) => {
  const script = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];
  let loaded;

  script.src = src;

  script.onload = script.onreadystatechange = function () {
    if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
      script.onload = script.onreadystatechange = null;
      loaded = true;

      if (typeof onReady === 'function') {
        onReady();
      }
    }
  };

  head.appendChild(script);
}

export default {
  getServerHost,
  loadThirdPartyScript
};
