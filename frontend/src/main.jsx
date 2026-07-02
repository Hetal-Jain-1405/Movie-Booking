import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login/Login.jsx'
import { BrowserRouter, Routes, Route} from "react-router";
import SignUp from './components/SignUp/SignUp.jsx'
    



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
  </Routes>
      
  </BrowserRouter>,
)