import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginContainer } from './views/login/login.container';
import { HomePageContainer } from './views/home/home.container';
import { AppGuardedRoute } from './shared/app-router-guard/app-router-guard-container';

export const RoutePath = (): React.ReactElement<void> => (
  <Routes>
    <Route path="/">
      <Route index element={<AppGuardedRoute><HomePageContainer /></AppGuardedRoute>} />
      <Route path='/home' element={<AppGuardedRoute><HomePageContainer /></AppGuardedRoute>} />
    </Route>
    <Route path='/login' element={<LoginContainer />} />
  </Routes>
);
