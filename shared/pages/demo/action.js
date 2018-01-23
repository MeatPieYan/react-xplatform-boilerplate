/*
  * the constants of the actions
  * COM/渠道_DST   公共action
  * PRO/渠道_DST   产品action
  * ACT/渠道_DST   活动action
*/

export const COM_DEMO = 'COM_DEMO';
export const COM_SAGA = 'COM_SAGA';

export const demoAction = () => ({ type: COM_DEMO });
export const sagaAction = data => ({ type: COM_SAGA, payload: data });
