import React from 'react'
import ReactDOM from 'react-dom/client'
import Registration from './Features/Registration/components/Registration.jsx'
import PersonalAccount from './Features/PersonalAccount/components/PersonalAccount.jsx'
import './styles/css/index.css'
import { createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
const loggedIn = window.localStorage.getItem("isLoggedIn");
const router = createBrowserRouter([
  {
    path: '/',
    element: loggedIn ? <PersonalAccount /> : <Navigate to='/registration'/>,
    errorElement: (<div>
      <h1>404</h1>
      <h2>There's an error</h2>
    </div>),
  },
  {
    path: '/registration',
    element: !loggedIn ? <Registration /> : <Navigate to='/'/>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < RouterProvider router={router} />
  </React.StrictMode>,
)