import axios from "axios";
import { useEffect, useState } from "react";
import {
    FaCheck,
    FaTicketAlt,
    FaHome,
    FaQrcode,
  } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
  
  export default function BookingSuccess() {
  
    const {imdbID, showID, booking_id, total} = useParams()
    const [movie, setMovie] = useState([])
    const [show, setShow] = useState([])
    const [booking_detail, setBookingDetail] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        const fetchMovie = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/movies/id/${imdbID}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMovie(response.data)
            console.log(response.data)
        }
        const fetchShow = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/shows/details/${showID}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShow(response.data)
            console.log(response.data)
        }

        const fetchBooking = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/booking/${booking_id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setBookingDetail(response.data)
            console.log(response.data)
        }

        fetchMovie()
        fetchShow()
        fetchBooking()
    },[])


    return (
      <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-6">
        <div className="max-w-6xl w-full">
  
          {/* Success */}
          <div className="flex flex-col items-center">
  
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl">
              <FaCheck />
            </div>
  
            <h1 className="text-5xl font-bold mt-5">
              Booking Confirmed!
            </h1>
  
            <p className="text-gray-500 mt-3">
              Your cinematic journey is ready. We've sent the tickets to your email.
            </p>
  
          </div>
  
          {/* Main */}
          <div className="grid grid-cols-3 gap-6 mt-12">
  
            {/* Ticket */}
            <div className="col-span-2 bg-white rounded-xl border border-red-200 overflow-hidden flex">
  
              {/* Poster */}
              <img
                src={movie.Poster}
                alt=""
                className="w-56 object-cover"
              />
  
              {/* Details */}
              <div className="flex-1 p-8 flex flex-col justify-between">
  
                <div>
  
                  <div className="flex justify-between items-center">
  
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wide">
                      {movie.Genre}
                    </span>
  
                    <span className="text-xs text-gray-400">
                      ID: {booking_id}
                    </span>
  
                  </div>
  
                  <h2 className="text-3xl font-bold mt-4">
                    {movie.Title}
                  </h2>
  
                  <div className="grid grid-cols-2 gap-y-6 mt-8 text-sm">
  
                    <div>
                      <p className="text-gray-400 uppercase text-xs">
                        Date & Time
                      </p>
  
                      <p className="font-semibold">
                        {show.date_scheduled}
                      </p>
  
                      <p>{show.time_scheduled}</p>
                    </div>
  
                    <div>
                      <p className="text-gray-400 uppercase text-xs">
                        Tickets
                      </p>
  
                      <p className="font-semibold">
                        {booking_detail.count_of_tickets}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 uppercase text-xs">
                        Screen
                      </p>
  
                      <p className="font-semibold">
                        {show.screen_number}
                      </p>
                    </div>
  
                  </div>
  
                </div>
  
                <div className="border-t pt-6 flex justify-between items-end">
  
                  <div>
  
                    <p className="text-xs text-gray-400">
                      Total Paid
                    </p>
  
                    <p className="text-3xl text-red-600 font-bold">
                      Rs.{total} 
                    </p>
  
                  </div>
  
                  <div className="text-center">
                    <FaQrcode className="text-5xl mx-auto" />
                    <p className="text-xs text-gray-500 mt-2">
                      Scan at entry
                    </p>
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
            {/* Right Cards */}
            <div className="space-y-6">
  
              <div
                onClick={() => navigate("/bookings")}
                className="cursor-pointer bg-white border border-red-200 rounded-xl p-8 hover:shadow-lg transition"
              >
  
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FaTicketAlt />
                </div>
  
                <h3 className="text-2xl font-bold mt-8">
                  View My Bookings
                </h3>
  
                <p className="text-gray-500 mt-3">
                  Manage your tickets and see upcoming showtimes.
                </p>
  
              </div>
  
              <div
                onClick={() => navigate("/home")}
                className="cursor-pointer bg-red-600 text-white rounded-xl p-8 hover:bg-red-700 transition"
              >
  
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                  <FaHome />
                </div>
  
                <h3 className="text-2xl font-bold mt-8">
                  Back to Home
                </h3>
  
                <p className="mt-3 text-red-100">
                  Explore more movies and discover your next favorite film.
                </p>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
      </div>
    );
  }