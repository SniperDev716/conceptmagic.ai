import { lazy } from 'react';

const routes = [
  {
    path: 'welcome',
    component: lazy(() => import('../pages/Home/Welcome')),
    exact: true,
  },
  {
    path: 'projects',
    component: lazy(() => import('../pages/Home/Project')),
    exact: true,
  },
  {
    path: 'upload',
    component: lazy(() => import('../pages/Home/Upload')),
    exact: true,
  },
  {
    path: 'desc/:id',
    component: lazy(() => import('../pages/Home/Description')),
    exact: true,
  },
  {
    path: 'result/:id',
    component: lazy(() => import('../pages/Home/Result')),
    exact: true,
  },
  {
    path: 'home',
    component: lazy(() => import('../pages/Home/Home')),
    exact: true,
  },
  {
    path: 'photos',
    component: lazy(() => import('../pages/Home/Photos')),
    exact: true,
  },
  {
    path: 'admin/users/:id/history',
    component: lazy(() => import('../pages/Home/Home')),
    exact: true,
  },
  {
    path: 'plans',
    component: lazy(() => import('../pages/Price/Lists')),
    exact: true,
  },
  {
    path: 'plans/:slug',
    component: lazy(() => import('../pages/Price/Subscription')),
    exact: true,
  },
  {
    path: 'user/profile',
    component: lazy(() => import('../pages/Profile/Edit')),
    exact: true,
  },
  {
    path: 'admin/users',
    component: lazy(() => import('../pages/Admin/Users')),
    exact: true,
    isAdmin: true,
  },
];

export default routes;
