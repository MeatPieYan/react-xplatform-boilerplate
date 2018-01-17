export const appLogin = data => ({ type: 'ACTION_APP_LOGIN', payload: { text: data } });
export const appShare = data => ({ type: 'ACTION_APP_SHARE', payload: { data } });
export const appSetTitle = title => ({ type: 'ACTION_APP_SET_TITLE', payload: { title } });
export const appShowLoading = show => ({ type: 'ACTION_APP_LOADING', payload: { show } });
