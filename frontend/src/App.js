import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About.js";
import Bids from "./routes/Bids.js";
import Contact from "./routes/Contact";

export default function App() {
  return (
    <div className="App"><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/bids" element={<Bids/>}/>
    <Route path="/contact" element={<Contact/>}/>
  </Routes>
    </div>
  );
}