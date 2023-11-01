import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error404/ErrorPage.tsx'
import LoginPage from './pages/login/Login.tsx'
import RegisterPage from './pages/register/Register.tsx'
import UserPage from './pages/user/User.tsx'
import HomePage from './pages/home/Home.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import UsersListPage from './pages/user/UsersList.tsx'
import HistoryPage from './pages/history/History.tsx'
const router  = createBrowserRouter([
  {
    path: '/', element: <HomePage/>, errorElement: <ErrorPage/>,
    children: [
      {path: '/', element: <HistoryPage/>},
      {path: '/login', element: <LoginPage/>},
      {path: '/register', element: <RegisterPage/>},
      {path: '/user/:id', element: <UserPage/>},
      {path: '/users', element: <UsersListPage/>},
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
)
