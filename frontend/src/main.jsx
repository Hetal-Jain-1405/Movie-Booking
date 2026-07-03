import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login/Login.jsx'
import { BrowserRouter, Routes, Route} from "react-router";
import SignUp from './pages/SignUp/SignUp.jsx'
import Home from './pages/Home/Home.jsx'
    



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
  </Routes>
      
  </BrowserRouter>,
)