import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error404/ErrorPage.tsx'
import LoginPage from './pages/login/Login.tsx'
import RegisterPage from './pages/register/Register.tsx'
import UserPage from './pages/user/User.tsx'
import ProposalPage from './pages/proposal/Proposal.tsx'
import HomePage from './pages/home/Home.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import UsersListPage from './pages/user/UsersList.tsx'
import HistoryPage from './pages/history/History.tsx'
import SucessfullyRegisteredPage from './pages/sucessfullyRegisteredPage/SucessfullyRegisteredPage.tsx';
import { ContantsProvider } from './contexts/ConstantsContext.tsx'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import PromptPage from './pages/prompt/Prompt.tsx'
const router  = createBrowserRouter([
  {
    path: '/', element: <HomePage/>, errorElement: <ErrorPage/>,
    children: [
      {path: '/', element: <HistoryPage/>},
      {path: '/login', element: <LoginPage/>},
      {path: '/register', element: <RegisterPage/>},
      {path: '/user/:id', element: <UserPage/>},
      {path: '/prompt/:id', element: <PromptPage/>},
      {path: '/proposal/:id', element: <ProposalPage/>},
      {path: '/users', element: <UsersListPage/>},
      {path: '/sucessfully-registered', element: <SucessfullyRegisteredPage/>}
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <ContantsProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ContantsProvider>
  </LanguageProvider>
)
