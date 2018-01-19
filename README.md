# react-xplatform-boilerplate
The boilerplate for Cross-platform solution

#redux
  action：

    命名规范：
    /*
    * the constants of the actions
    * COM/渠道_DST   公共action
    * PRO/渠道_DST   产品action
    * ACT/渠道_DST   活动action
    */
    export const COM_TEST = 'COM_TEST';
    /*
    * real actions
    */
    export const testAction = data => ({ type: COM_PAY, payload: data });


  reducer:

    import * as actions from './commonAction';
    ...
    (state = {}, action) => {
      switch (action.type) {
        case actions.SET_UI_STATE:
          return {
            [action.payload.key]: action.payload.value
          };
          default:
            return state;
      }
    };


  saga:

    import * as actions from './commonAction';
    ...
    export default function* () {
      yield all([
        takeLatest(actions.COM_TEST, test)
      ]);
    }
