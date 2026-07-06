import axios from "axios";
import { useEffect, useState } from "react";
import { FaCrown, FaLock } from "react-icons/fa";
import profile_photo from '../../assets/profile.png'


export default function Profile() {

    const [profile, setProfile] = useState([])

    useEffect(()=> {
        const token = localStorage.getItem('access_token')
        
        const fetchProfile = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/users/profile`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setProfile(response.data)
        }
        fetchProfile()
    },[])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Profile Header */}
        <div className="flex items-center gap-8">

          <img
            src={profile_photo}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />

          <div>

            <h1 className="text-6xl font-bold text-gray-900">
              {profile.name}
            </h1>

          </div>

        </div>

        {/* Account Card */}
        <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

          {/* Heading */}
          <div className="flex justify-between items-center mb-10">

            <h2 className="text-4xl font-bold">
              Account Details
            </h2>

            <FaLock className="text-gray-500 text-xl" />

          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-8">

            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                defaultValue={profile.name}
                className="w-full border border-gray-200 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                defaultValue={profile.email}
                className="w-full border border-gray-200 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">
                Phone Number
              </label>

              <input
                type="text"
                defaultValue="+91 xxxxx xxxxx"
                className="w-full border border-gray-200 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">
                Date of Birth
              </label>

              <input
                type="date"
                className="w-full border border-gray-200 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}