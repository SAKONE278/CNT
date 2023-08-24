import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import NotFoundView from './views/errors/NotFoundView';
import SidebarLayout from './layouts/SidebarLayout';
import AuthLayout from './layouts/AuthLayout';
import LoginView from './views/auth/LoginView';
import SignUpView from './views/auth/SignUpView';
import ForgotView from './views/auth/ForgotView';
import ResetView from './views/auth/ResetView';
import WelcomeView from './views/main/WelcomeView';
import AccountView from './views/account/AccountView';
import ChatView from './views/chat/ChatView';
import AdminLayout from './layouts/AdminLayout';
import UsersListView from './views/admin/UsersListView';
import DashboardView from './views/admin/DashboardView';

const routes = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      { path: '', element: <WelcomeView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'room/:id', element: <ChatView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: '', element: <Navigate to="/auth/login" /> },
      { path: 'login', element: <LoginView /> },
      { path: 'sign-up', element: <SignUpView /> },
      { path: 'forgot', element: <ForgotView /> },
      { path: 'code', element: <ResetView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <Navigate to="/admin/users" /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'users', element: <UsersListView /> },
    ],
  },
  {
    path: '/404',
    element: <MainLayout />,
    children: [{ path: '', element: <NotFoundView /> }],
  },
  {
    path: '*',
    element: <MainLayout />,
    children: [{ path: '*', element: <NotFoundView /> }],
  },
];

export default routes;
