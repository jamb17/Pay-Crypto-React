import React from 'react'
import Registration from '../Features/Reg_and_login/Registration/Registration.jsx'
import PersonalAccount from '../Features/PersonalAccount/components/PersonalAccount.jsx'
import {useRoutes} from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx'
import PublicRoute from './PublicRoute.jsx'
import Login from '../Features/Reg_and_login/Login/Login.jsx';
import { Settings } from '../Features/PersonalAccount/components/Settings.jsx';

 export default function App () {

  const routes = useRoutes([
    {
      element: <PrivateRoute />,
      children: [
        {path: '/', element: <PersonalAccount />},
        {path: '/settings', element: <Settings />},
        {path: '/blog', element: <PersonalAccount />}
      ]
    },
    {
      element: <PublicRoute />,
      children: [
        {path: 'registration', element: <Registration />},
        {path: 'login', element: <Login/>}
      ]
    },
    {
      path: '*',
      element: (
        <div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
        </div>
      ),
    },
  ])

  return routes;
}