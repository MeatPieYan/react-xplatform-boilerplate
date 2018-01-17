import React from 'react';
import App from './pages/App';
import TestComp from './pages/activity/activityA/Container';
import prodComp from './pages/product/productA/Container';
import TestComp1 from './pages/test.1';
import PayComp from './pages/pay/Container';

const Home2 = () => (
  <div>
    <h2>111</h2>
  </div>
);

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/test',
        exact: true,
        component: TestComp
      },
      {
        path: '/test1',
        exact: true,
        component: TestComp1
      },
      {
        path: '/productA',
        exact: true,
        component: prodComp
      },
      {
        path: '/abc',
        exact: true,
        component: Home2
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
