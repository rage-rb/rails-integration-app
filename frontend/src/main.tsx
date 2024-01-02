import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './Home.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Slots from './Slots.tsx';
import Confirmation from './Confirmation.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/slots",
    element: <Slots />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

