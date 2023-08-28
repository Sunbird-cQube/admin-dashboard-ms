import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginContainer } from './views/login/login.container';
import { HomePageContainer } from './views/home/home.container';

export const RoutePath = (): React.ReactElement<void> => (
  <Routes>
    <Route path='/' element={<HomePageContainer />} />
    <Route path='/login' element={<LoginContainer />} />
  </Routes>
);
