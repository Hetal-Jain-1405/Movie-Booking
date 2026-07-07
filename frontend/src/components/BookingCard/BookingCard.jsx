import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingCard({ booking }) {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const badge = {
      true: "bg-green-100 text-green-700",
      false: "bg-red-100 text-red-600",
    };
  
    const formattedDate = new Date(booking.show.date_scheduled).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    const formattedTime = new Date(`1970-07-01T${booking.show.time_scheduled}`).toLocaleTimeString('en-In',{
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const [movie, setMovie] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        const fetchMovie = async() => {
            const response = await axios.get(`${backendUrl}/movies/id/${booking.show.imdb_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMovie(response.data)
            console.log(response.data)
        }
        fetchMovie()
    },[])

    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex justify-between items-center shadow-sm">
  
        {/* Left */}
        <div className="flex gap-6">
  
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-24 h-32 rounded-lg object-cover"
          />
  
          <div>
  
            <h2 className="text-2xl font-bold">
              {movie.Title}
            </h2>
  
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-5 text-sm">
  
              <div>
                <p className="text-gray-400 uppercase text-xs">Date</p>
                <p>{formattedDate}</p>
              </div>
  
              {booking.show.time_scheduled && (
                <div>
                  <p className="text-gray-400 uppercase text-xs">Time</p>
                  <p>{formattedTime}</p>
                </div>
              )}
  
              {booking.show.screen_number && (
                <div>
                  <p className="text-gray-400 uppercase text-xs">Screen</p>
                  <p>{booking.show.screen_number}</p>
                </div>
              )}
  
              {booking.payment.amount && (
                <div>
                  <p className="text-gray-400 uppercase text-xs">Total</p>
                  <p>{booking.payment.amount}</p>
                </div>
              )}
  
              {booking.reason && (
                <div>
                  <p className="text-gray-400 uppercase text-xs">Reason</p>
                  <p className="text-red-500">{booking.reason}</p>
                </div>
              )}
  
              {booking.refund && (
                <div>
                  <p className="text-gray-400 uppercase text-xs">Refund</p>
                  <p className="text-green-600">{booking.refund}</p>
                </div>
              )}
  
            </div>
  
          </div>
  
        </div>
  
        {/* Right */}
        <div className="flex flex-col items-end justify-between h-full">
        
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${badge[booking.payment.is_success]}`}
          >
              {booking.payment.is_success ? "Success" : "Failed"}
          </span>
  
        </div>
  
      </div>
    );
  }