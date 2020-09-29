import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import ContextStore from './context/ContextStore.js';
import LoginPage from './components/login/LoginPage.js';
import Courses from './components/Courses.js'

// require('dotenv').config();

function App() {
  // ==== Routes ====
  const routes = [
    {
      path: '/login',
      component: LoginPage,
      key: 'login'
    },
    {
      path: '/courses',
      component: Courses,
      key: 'courses',
    }
  ];
  // UserContext is provided through ContextStore.js
  return (
    // <ContextStore>
      <BrowserRouter>
        {routes.map((route) => {
          return (
            <Route
              component={route.component}
              path={route.path}
              key={route.key}
              exact={route.exact}
            />
          );
        })}
      </BrowserRouter>
    // </ContextStore>
  );
};

export default App;
