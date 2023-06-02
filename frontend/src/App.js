import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About.js";
import Bids from "./routes/Bids.js";
import Contact from "./routes/Contact";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import ForgetPasswordPage from "./routes/ForgetPasswordPage";
<<<<<<< HEAD
import VerifyEmailPage from "./routes/VerifyEmailPage";
import VerifyAccountPage from "./routes/VerifyAccountPage";
=======
import EmailVerification from "./routes/email_verification_sent";
import EmailConfirmation from "./routes/email_confirmation";
>>>>>>> 36cc88f62a50b9995df3a05a825224e20b7bf2ca


export default function App() {
  return (
    <div className="App"><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/bids" element={<Bids/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/success" element={<EmailVerification/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/email_verification/:token" element={<EmailConfirmation/>}/>
    <Route path="/forget-password" element={<ForgetPasswordPage/>}/>
    <Route path="/verifyemail" element={<VerifyEmailPage/>}/>
    <Route path="/verifyacc" element={<VerifyAccountPage/>}/>
  </Routes>
    </div>
  );
}