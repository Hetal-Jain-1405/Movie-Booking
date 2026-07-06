import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";


export default function OrderBox({ticketCount, price, showID,imdbID}) {

  const navigate = useNavigate()

    const postBooking = async() => {
      try{
        const token = localStorage.getItem('access_token')
        const response = await axios.post(`http://127.0.0.1:8000/booking/new`, {

            show_id: showID,
            count_of_tickets: ticketCount
            
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        console.log(response.data);
        navigate(`/movie/${imdbID}/new_booking/${showID}/${response.data.id}/${price*ticketCount}`)
      }
      catch(error){
        console.error(error)
      }
      
    }

    return (
        <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
  
        <div className="bg-red-700 text-white p-6">

          <h2 className="text-2xl font-semibold">
            Order Summary
          </h2>

        </div>

        <div className="p-6 space-y-5">

          <div className="flex justify-between">
            <span>Cost (1 ticket):</span>
            <span>{price} Rs</span>
          </div>


          <div className="flex justify-between">
            <span>Number of tickets</span>
            <span>x {ticketCount}</span>
          </div>

          <hr />

          <div className="flex justify-between items-end">

            <div>

              <p className="font-bold text-xl">
                Total Amount
              </p>

            </div>

            <h2 className="text-3xl text-red-700 font-bold">
              {price*ticketCount} Rs
            </h2>

          </div>

          <button 
            onClick={postBooking}
            className="w-full bg-red-700 hover:bg-red-800 text-white rounded-xl py-4 font-semibold">
            Proceed to Payment
          </button>

          <p className="text-xs text-center text-gray-500">
            By clicking proceed, you agree to our Terms of Service.
          </p>

        </div>

      </div>
    )
}