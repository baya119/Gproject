import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import BidsPage from './pages/BidsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundErrorPage from './pages/NotFoundErrorPage';
import BidDetailPage from './pages/BidDetailPage';
import { PaymentSuccess } from './pages/PaymentSucess';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/signIn",
        element: <SignInPage />
      },
      {
        path: "/signUp",
        element: <SignUpPage />
      },
      {
        path: "/bids",
        element: <BidsPage />
      },
      {
        path: "/profile/*",
        element: <ProfilePage />,
      },
      {
        path: "/sucess",
        element: <PaymentSuccess />,
      },
      {
        path: "/bid-detail/:bidId",
        element: <BidDetailPage />
      },
      {
        path: "*",
        element: <NotFoundErrorPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
