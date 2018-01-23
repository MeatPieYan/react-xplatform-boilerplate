import React from 'react';
import App from './pages/App';
import TestComp from './pages/activity/activityA/Container';
import DemoComp from './pages/demo/Container';
import PayComp from './pages/pay/Container';


const routes = [
  {
    component: App,
    routes: [
      {
        path: '/demo',
        exact: true,
        component: DemoComp
      },
      {
        path: '/test',
        exact: true,
        component: TestComp
      },
      {
        path: '/pay',
        exact: true,
        component: PayComp
      }
    ]
  }
];

export default routes;
