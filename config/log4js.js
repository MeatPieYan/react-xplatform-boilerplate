module.exports = {
  dev: {
    appenders: {
      infoLogger: {
        type: 'stdout'
      },
      errorLogger: {
        type: 'stdout'
      },
      access: {
        type: 'stdout'
      }
    },
    categories: {
      default: {
        appenders: ['infoLogger'],
        level: 'all'
      },
      error: {
        appenders: ['errorLogger'],
        level: 'error'
      }
    }
  },
  pre: {
    appenders: {
      infoLogger: {
        type: 'stdout'
      },
      errorLogger: {
        type: 'stdout'
      },
      access: {
        type: 'stdout'
      }
    },
    categories: {
      default: {
        appenders: ['infoLogger'],
        level: 'all'
      },
      error: {
        appenders: ['errorLogger'],
        level: 'error'
      }
    }
  },
  prd: {
    appenders: {
      infoLogger: {
        type: 'stdout'
      },
      errorLogger: {
        type: 'stdout'
      },
      access: {
        type: 'stdout'
      }
    },
    categories: {
      default: {
        appenders: ['infoLogger'],
        level: 'all'
      },
      error: {
        appenders: ['errorLogger'],
        level: 'error'
      }
    }
  }
};
