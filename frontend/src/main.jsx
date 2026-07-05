import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login/Login.jsx'
import { BrowserRouter, Routes, Route} from "react-router";
import SignUp from './pages/SignUp/SignUp.jsx'
import Home from './pages/Home/Home.jsx'
import MovieDetails from './pages/MovieDetails/MovieDetails.jsx'
import Booking from './pages/Booking/Booking.jsx'
    



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path='/movie/:imdbID/new_booking/:showID' element={<Booking />} />
  </Routes>
      
  </BrowserRouter>,
)