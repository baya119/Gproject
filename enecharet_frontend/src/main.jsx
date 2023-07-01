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
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import PaymentSucess from './pages/PaymentSucess';
import ForgotPassword from './pages/ForgotPassword';
import VerifyAccuntPage from './pages/VerifyAccuntPage';

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
        path: "/profile/bid-detail/:bidId",
        element: <BidDetailPage />
      },
      {
        path: "/profile/*",
        element: <ProfilePage />,
      },
      {
        path: "/success",
        element: <PaymentSucess />,
      },
      {
        path: "/bid-detail/:bidId",
        element: <BidDetailPage />
      },
      {
        path: "/admin",
        element: <AdminPage />
      },
      {
        path: "/adminLogin",
        element: <AdminLoginPage />
      },
      {
        path: "/verifyAccount",
        element: <VerifyAccuntPage />
      },
      {
        path: "*",
        element: <NotFoundErrorPage />
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
