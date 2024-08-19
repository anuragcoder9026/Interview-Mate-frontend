import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from './components/DashBoard.jsx';
import CardGrid from './components/homearrangecard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <CardGrid /> },
      { path: '/dashboard', element: <DashBoard /> },
    ],
  },
], {
  basename: '/Interview-Mate-frontend/', // Add this line
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
