import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Courses from './components/Courses.js'
// import './App.css';

// require('dotenv').config();

function App() {

  const routes = [
    {
      path: '/courses',
      component: Courses,
      key: 'courses',
    }
  ];

  return (
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
  )
};

export default App;
