
export const payAction = (data, callback) => ({ type: 'ACTION_PAY', payload: data, onSuccess: callback || null });
export const loginAction = data => ({ type: 'ACTION_LOGIN', payload: { text: data } });

// app客户端调用
export const appLogin = data => ({ type: 'ACTION_APP_LOGIN', payload: { text: data } });
export const appShare = data => ({ type: 'ACTION_APP_SHARE', payload: { data } });
export const appSetTitle = title => ({ type: 'ACTION_APP_SET_TITLE', payload: { title } });
export const appShowLoading = show => ({ type: 'ACTION_APP_LOADING', payload: { show } });
