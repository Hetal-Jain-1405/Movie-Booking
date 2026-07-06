import {
    CalendarDays,
    Clock3,
    Ticket,
  } from "lucide-react";
import { useParams } from "react-router";
import Counter from "../../components/Counter/Counter";
import { useEffect, useState } from "react";
import OrderBox from "../../components/OrderBox/OrderBox";
import axios from "axios";
import MovieName from "../../components/MovieName/MovieName";
  
  export default function NewBooking() {
    const {imdbID, showID} = useParams()

    const [showDetails, setShowDetails] = useState([])
    const [ticketCount, setticketCount] = useState(1)



    useEffect(() => {
        const fetchShowDetails = async() => {
            const token = localStorage.getItem('access_token')
            const response = await axios.get(`http://127.0.0.1:8000/shows/details/${showID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setShowDetails(response.data)
        }
        fetchShowDetails()
    },[])

    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-7xl grid grid-cols-3 gap-8">
  
          {/* LEFT SIDE */}
  
          <div className="col-span-2 space-y-6">
  
            {/* Movie */}
  
            <div className="flex gap-6">
  
              <MovieName imdbID = {imdbID} />
  
            </div>
  
            {/* Ticket Quantity */}
  
            <div className="bg-white rounded-2xl shadow p-6">
  
              <div className="flex justify-between">
  
                <div>
                  <h2 className="font-semibold text-2xl">
                    Ticket Quantity
                  </h2>
                </div>
  
                <Counter 
                    ticketCount = {ticketCount}
                    setTicketCount = {setticketCount} />
  
              </div>
  
              <div className="grid grid-cols-2 gap-5 mt-6">
  
                <div className="border rounded-xl p-4 flex items-center gap-4">
  
                  <CalendarDays className="text-blue-500" />
  
                  <div>
  
                    <p className="text-xs text-gray-400">
                      Date
                    </p>
  
                    <p className="font-semibold">
                      {new Date(showDetails.date_scheduled).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
  
                  </div>
  
                </div>
  
                <div className="border rounded-xl p-4 flex items-center gap-4">
  
                  <Clock3 className="text-blue-500" />
  
                  <div>
  
                    <p className="text-xs text-gray-400">
                      Time
                    </p>
  
                    <p className="font-semibold">
                      {new Date(`1970-01-01T${showDetails.time_scheduled}`).toLocaleTimeString(
                            "en-US",
                            {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            }
                        )}
                    </p>
  
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
  
          </div>
  
          {/* RIGHT SIDE */}
  
          <div>
  
            <OrderBox 
                ticketCount = {ticketCount}
                price = {showDetails.price}
                showID = {showID}
                imdbID = {imdbID}/>
  
          </div>
  
        </div>
      </div>
    );
  }