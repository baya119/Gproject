import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About.js";
import Bids from "./routes/Bids.js";
import Contact from "./routes/Contact";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import ForgetPasswordPage from "./routes/ForgetPasswordPage";
import EmailVerification from "./routes/email_verification_sent";


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
    <Route path="/forget-password" element={<ForgetPasswordPage/>}/>
    ForgetPasswordPage
  </Routes>
    </div>
  );
}