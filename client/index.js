import PieDom from 'za-piedom';
import routers from '../shared/router';
import reducer from '../shared/redux/rootReducer';
import saga from '../shared/redux/rootSaga';

PieDom.render('root', routers, reducer, saga);

if (module.hot) {
  module.hot.accept();
}
