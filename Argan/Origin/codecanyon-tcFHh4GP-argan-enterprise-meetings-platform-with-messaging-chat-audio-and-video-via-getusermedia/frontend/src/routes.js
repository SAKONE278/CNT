import { Navigate } from 'react-router-dom';
import Layouts from './layouts';
import Views from './views';

const routes = [
  {
    path: '/',
    element: <Layouts.Meeting />,
    children: [
      { path: '/', element: <Views.Home /> },
      { path: 'meeting/:key', element: <Views.Meeting /> },
      { path: 'meeting', element: <Navigate to="/" /> },
      { path: 'join/:key', element: <Views.Join /> },
      { path: 'join', element: <Navigate to="/" /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default routes;
