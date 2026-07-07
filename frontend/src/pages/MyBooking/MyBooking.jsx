import { useEffect, useState } from 'react';
import BookingCard from '../../components/BookingCard/BookingCard';
import axios from 'axios';


export default function MyBookings() {

  const [all_bookings, setAllBookings] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchBookings = async() => {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(`${backendUrl}/booking/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setAllBookings(response.data)
        console.log(response.data)
    }
    fetchBookings()
  },[])


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-2 mb-10">
          Review your cinematic journey and manage upcoming reservations.
        </p>

        <div className="space-y-6">
          {all_bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>

      </div>
    </div>
  );
}