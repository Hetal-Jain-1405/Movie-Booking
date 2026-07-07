import axios from "axios";
import {
    FaCreditCard,
    FaLock,
    FaShieldAlt,
  } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
  
  export default function PaymentCard() {

    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { imdbID, showID, booking_id, total} = useParams();

    const postPayment = async() => {
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.post(`${backendUrl}/payment/${booking_id}`, 
                {
                    payment_mode: 'card',
                    amount: total,
                    is_success: 'true',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response.data)
                navigate(`/movie/${imdbID}/new_booking/${showID}/${booking_id}/${total}/confirmed`)

        }
        catch(error){
            console.log(error)
        }
        
    }

    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
        <div className="w-full max-w-xl bg-white border border-red-200 rounded-2xl p-10 shadow-sm">
  
          <h1 className="text-4xl font-bold mb-10">
            Secure Checkout
          </h1>
  
          {/* Cardholder Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold tracking-wide mb-2">
              Cardholder Name
            </label>
  
            <input
              type="text"
              placeholder="e.g. Full Name"
              className="w-full border border-red-200 rounded-lg px-5 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
  
          {/* Card Number */}
          <div className="mb-6">
            <label className="block text-sm font-semibold tracking-wide mb-2">
              Card Number
            </label>
  
            <div className="flex items-center border border-red-200 rounded-lg px-4">
              <FaCreditCard className="text-gray-600 text-lg" />
  
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="flex-1 px-4 py-3 outline-none"
              />
            </div>
          </div>
  
          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-5 mb-6">
  
            <div>
              <label className="block text-sm font-semibold mb-2">
                Expiry Date
              </label>
  
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-red-200 rounded-lg px-5 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-semibold mb-2">
                CVC
              </label>
  
              <div className="flex items-center border border-red-200 rounded-lg px-4">
                <input
                  type="password"
                  placeholder="***"
                  className="flex-1 py-3 outline-none"
                />
  
                <FiHelpCircle className="text-xl text-gray-500" />
              </div>
            </div>
  
          </div>
  
          {/* Footer */}
          <div className="flex gap-8 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <FaLock />
              <span>SSL Secure Connection</span>
            </div>
  
            <div className="flex items-center gap-2">
              <FaShieldAlt />
              <span>PCI-DSS Compliant</span>
            </div>
          </div>
  
          {/* Buttons */}
          <button 
            onClick={postPayment}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg py-3 transition">
            💳 Pay {total} Rs Now
          </button>
  
        </div>
      </div>
    );
  }