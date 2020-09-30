import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import ContextStore from './context/ContextStore.js';
import LoginPage from './components/login/LoginPage.js';
import Courses from './components/courses/Courses.js'
import CourseShow from './components/courses/CourseShow.js';
import Categories from './components/categories/Categories.js';
import CategoryViewCourses from './components/categories/CategoryViewCourses.js';
import Dashboard from './components/dashboard/Dashboard.js';

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
      exact: true,
      component: Courses,
      key: 'courses',
    },
    {
      path: '/courses/:id',
      component: CourseShow,
      key: 'courseShow'
    },
    {
      path: '/categories',
      exact: true,
      component: Categories,
      key: 'categories'
    },
    {
      path: '/categories/:id',
      component: CategoryViewCourses,
      key: 'categoryViewCourses'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      key: 'dashboard'
    },
    {
      path: '/',
      exact: true,
      component: LoginPage,
      key: 'default'
    }
  ];
  // UserContext is provided through ContextStore.js
  // <ContextStore>
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
  );
};

export default App;
