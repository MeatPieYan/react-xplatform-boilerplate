import React from 'react';
import App from './pages/App';
import TestComp from './pages/test';
import TestComp1 from './pages/test.1';

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
        path: '/abc',
        exact: true,
        component: Home2
      }
    ]
  }
];

export default routes;
