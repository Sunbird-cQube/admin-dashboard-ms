import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginContainer } from './views/login/login.container';

export const RoutePath = (): React.ReactElement<void> => (
  <Routes>
    <Route path='/' element={<LoginContainer />} />
    <Route path='/login' element={<LoginContainer />} />
  </Routes>
);
