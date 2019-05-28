import React from 'react';

import './App.css';
import AccountManager from './containers/AccountManager';

const app = ({ appTitle }) => (
  <div className='App'>
    <h1 style={{ margin: '30px 0' }}>{appTitle}</h1>
    <AccountManager />
  </div>
);

export default app;
