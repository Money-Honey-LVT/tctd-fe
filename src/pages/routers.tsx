import { LoadingOverlay } from '@mantine/core';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTER from '../config/router';
import AppLayout from '../containers/AppLayout';

const Login = React.lazy(() => import('./Login'));
const SignUp = React.lazy(() => import('./SignUp'));
const Home = React.lazy(() => import('../components/Home'));
const Class = React.lazy(() => import('../components/Class'));
const ClassDetail = React.lazy(() => import('../components/ClassDetail'));
const Rankings = React.lazy(() => import('../components/Rankings'));
const Reference = React.lazy(() => import('../components/Reference'));
const Criterias = React.lazy(() => import('../components/Criterias'));
const Statistics = React.lazy(() => import('../components/Statistics'));
const _404NotFound = React.lazy(() => import('../components/common/_404NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTER.AUTH.LOGIN}
        element={
          <Suspense fallback={<LoadingOverlay visible />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={ROUTER.AUTH.SIGNUP}
        element={
          <Suspense fallback={<LoadingOverlay visible />}>
            <SignUp />
          </Suspense>
        }
      />

      <Route path={ROUTER.HOME.INDEX} element={<AppLayout />}>
        <Route path={ROUTER.HOME.INDEX} element={<Home />} />
        <Route path={ROUTER.NAV.STATISTICS.INDEX} element={<Statistics />} />
        <Route path={ROUTER.NAV.CLASS.INDEX} element={<Class />} />
        <Route path={ROUTER.NAV.CLASS.DETAIL} element={<ClassDetail />} />
        <Route path={ROUTER.NAV.RANKINGS.INDEX} element={<Rankings />} />
        <Route path={ROUTER.NAV.REFERENCE.INDEX} element={<Reference />} />
        <Route path={ROUTER.NAV.CRITERIAS.INDEX} element={<Criterias />} />
        <Route path="*" element={<_404NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
