
export const payAction = (data, callback) => ({ type: 'ACTION_PAY', payload: data, onSuccess: callback || null });
export const loginAction = data => ({ type: 'ACTION_LOGIN', payload: { text: data } });
