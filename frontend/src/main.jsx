import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login/Login.jsx'
import { BrowserRouter, Routes, Route} from "react-router";
import SignUp from './pages/SignUp/SignUp.jsx'
import Home from './pages/Home/Home.jsx'
import MovieDetails from './pages/MovieDetails/MovieDetails.jsx'
import NewBooking from './pages/NewBooking/NewBooking.jsx'
import PaymentCard from './pages/PaymentCard/PaymentCard.jsx'
import BookingSuccess from './pages/ConfirmationCard/ConfirmationCard.jsx'
import MyBookings from './pages/MyBooking/MyBooking.jsx'
import Layout from './Layout.jsx'
import Profile from './pages/Profile/Profile.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

      <Route path='/' element={<Layout />} >
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path='/movie/:imdbID/new_booking/:showID' element={<NewBooking />} />
        <Route path='/movie/:imdbID/new_booking/:showID/:booking_id/:total' element={<PaymentCard />} />
        <Route path='/movie/:imdbID/new_booking/:showID/:booking_id/:total/confirmed' element={<BookingSuccess />} />

        <Route path='/bookings' element={<MyBookings />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
  </Routes>
      
  </BrowserRouter>,
)