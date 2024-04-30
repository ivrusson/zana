import { RouteObject } from 'react-router-dom';
import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import NewScriptPage from './pages/NewScriptPage.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'new-script', element: <NewScriptPage /> },
    ],
  },
];

export default routes;
