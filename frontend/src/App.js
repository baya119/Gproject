import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Base from "./routes/Base";
import About from "./routes/About.js";
import Contact from "./routes/Contact";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import ForgetPasswordPage from "./routes/ForgetPasswordPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorPage from "./routes/ErrorPage";
import { createContext, useState } from "react";
import Bids from "./routes/Bids";
import Upcoming from "./routes/Upcoming";
import Ongoing from "./routes/Ongoing";
import Closed from "./routes/Closed";
import Setting from "./routes/Setting";
import ChangePassword from "./routes/Setting/ChangePassword";
import VerifyEmail from "./routes/Setting/VerifyEmail";
import VerifyAccount from "./routes/Setting/VerifyAccount";
import CreateBids from "./routes/Bids/CreateBids";
import LoggedInNavBar from "./componets/LoggedInNavBar";
import VerifyEmailPage from "./routes/VerifyEmailPage";
export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
          isAuthenticated: isAuthenticated,
          setIsAuthenticated: setIsAuthenticated,
        }}
      >
        <Routes>
          {!isAuthenticated && [
            <Route path={"/"} element={<Home />} />,
            <Route path={"/register"} element={<RegisterPage />} />,
            <Route path={"/login"} element={<LoginPage />} />,
            <Route
              path={"/forgot-password"}
              element={<ForgetPasswordPage />}
            />,
          ]}
          <Route
            path={"/"}
            element={<ProtectedRoute component={Base} />}
            children={[
              <Route path={"/"} element={<div></div>} />,
              <Route path={"/upcoming"} element={<Upcoming />} />,
              <Route path={"/upcoming/create-bid"} element={<CreateBids />} />,
              <Route path={"/profile"} element={<div>Profile</div>} />,
              <Route path={"/ongoing"} element={<Ongoing />} />,
              <Route path={"/closed"} element={<Closed />} />,
              <Route path={"/deposit"} element={<div>Deposit</div>} />,
              <Route path={"/withdrawal"} element={<div>Withdrawal</div>} />,
              <Route path={"/setting"} element={<Setting />} />,
              <Route path={"/faq"} element={<div>faq</div>} />,
              <Route path={"/bids"} element={<Bids />} />,
              <Route path={"/sidebar-item-b"} element={<LoggedInNavBar />} />,
              
              <Route
                path={"/setting/change-password"}
                element={<ChangePassword />}
              />,
              <Route
                path={"/setting/verify-email"}
                element={<VerifyEmail />}
              />,
              <Route
                path={"/setting/verify-account"}
                element={<VerifyAccount />}
              />,
            ]}
          />
          <Route path={"/about"} element={<About />} />,
          <Route path={"/contact"} element={<Contact />} />,
          <Route path={"/*"} element={<ErrorPage />} />,
          <Route path={"/register"} element={<RegisterPage />} />,
          <Route path={"/home"} element={<Home />} />,
          <Route path={"/login"} element={<LoginPage />} />,
          <Route path={"/verifyemail"} element={<VerifyEmailPage />} />,
          <Route path={"/up"} element={<Upcoming />} />,
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
