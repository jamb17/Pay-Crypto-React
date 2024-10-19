import React from 'react'
import Registration from './Features/Registration/components/Registration.jsx'
import PersonalAccount from './Features/PersonalAccount/components/PersonalAccount.jsx'
import {useRoutes} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx'
import PublicRoute from './routes/PublicRoute.jsx'

// const loggedIn = useStore((state) => state.isAuth);

 export default function App () {

  const routes = useRoutes([
    {
      element: <PrivateRoute />,
      children: [
        {path: '/', element: <PersonalAccount />}
      ]
    },
    {
      element: <PublicRoute />,
      children: [
        {path: 'registration', element: <Registration />}
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