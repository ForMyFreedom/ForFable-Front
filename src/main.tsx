import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import Login from './pages/login/Login.tsx'
import Register from './pages/register/Register.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/errorPage/ErrorPage.tsx'

const router  = createBrowserRouter([
  {
    path: '/', element: <Home/>, errorElement: <ErrorPage/>,
    children: [
      {path: '/login', element: <Login/>},
      {path: '/register', element: <Register/>}, 
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
