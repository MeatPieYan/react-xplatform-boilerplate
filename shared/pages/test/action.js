export const testAction = () => ({ type: 'ACTION_TEST' });
export const sagaAction = data => ({ type: 'ACTION_SAGA', payload: { text: data } });

export const payAction = data => ({ type: 'ACTION_PAY', payload: { data } });
