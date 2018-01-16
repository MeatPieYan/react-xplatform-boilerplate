export const testAction = () => ({ type: 'ACTION_TEST_PROD_A' });
export const sagaAction = data => ({ type: 'ACTION_SAGA_PROD_A', payload: { text: data } });
