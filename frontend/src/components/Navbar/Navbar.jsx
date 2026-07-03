import {
    Search,
    Bell
  } from "lucide-react";
import {NavLink} from "react-router"


  export default function Navbar() {
    return (
      <nav className="flex items-center justify-between">
  
        <div className="flex items-center gap-10">
  
          <h1 className="text-4xl font-bold text-red-700">
            CineReserve
          </h1>
  
          <ul className="flex gap-8 font-medium">
            <li>
                <NavLink
                    to="/home"
                    className = {({isActive}) => isActive ? "text-red-600" : "text-gray-700"}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/bookings"
                    className = {({isActive}) => isActive ? "text-red-600" : "text-gray-700"}>
                    Bookings
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/profile"
                    className = {({isActive}) => isActive ? "text-red-600" : "text-gray-700"}>
                    Profile
                </NavLink>
            </li>
          </ul>
  
        </div>
  
        <div className="flex items-center gap-5">
  
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
  
            <Search size={18} />
  
            <input
              placeholder="Search movies..."
              className="ml-2 outline-none"
            />
  
          </div>
  
          <Bell size={20} />
  
          <img
            src="https://www.clipartmax.com/png/middle/214-2143742_individuals-whatsapp-profile-picture-icon.png"
            className="w-10 h-10 rounded-full"
          />
        </div>
  
      </nav>
    );
  }