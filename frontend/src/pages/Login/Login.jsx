import { FaEnvelope, FaEye, FaTicketAlt } from "react-icons/fa";
import cinema from '../../assets/cinema.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); //won't refresh the react page after form submission

    const formData = new URLSearchParams(); // Create a new URLSearchParams object to hold the form data
    formData.append('username', email); 
    formData.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/users/login/', formData)
      console.log('Login successful:', response.data);

      localStorage.setItem('access_token', response.data.access_token);

      alert('Login successful!'); 

      navigate('/home'); // Redirect to the home page after successful login
    }
    catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
      return;
    }
  };
  return (
    <div className="flex min-h-screen">
    {/* Left Side */}
      <div
        className="hidden lg:flex lg:w-2/3 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${cinema})` }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 flex flex-col justify-end p-16 text-white">

          <h1 className="flex items-center gap-3 text-5xl font-bold">
            <FaTicketAlt className="text-pink-400" />
            CineReserve
          </h1>

          <p className="mt-4 max-w-lg text-gray-300 leading-7">
            Experience cinema the way it was meant to be.
            Secure your front-row seat to the extraordinary.
          </p>

          <div className="flex gap-16 mt-10">
            <div>
              <p className="text-xs uppercase text-gray-400">
                Now Showing
              </p>
              <h3 className="text-xl font-semibold">
                Midnight Horizon
              </h3>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Rating
              </p>
              <h3 className="text-xl font-semibold">
                9.8/10
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="w-full lg:w-1/3 flex items-center justify-center bg-white">

        <div className="w-[380px] px-8">

          <h2 className="text-3xl font-semibold">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-3 text-sm leading-6">
            Log in to manage your reservations
            <br />
            and explore new releases.
          </p>

          <form className="mt-10" onSubmit={handleLogin}>

            {/* Email */}

            <label className="text-sm font-medium">
              Email Address
            </label>

            <div className="mt-2 flex items-center border rounded-lg px-4 py-3">
              <input
                type="email"
                placeholder="name@example.com"
                className="flex-1 outline-none"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
              />
              <FaEnvelope className="text-gray-400" />
            </div>

            {/* Password */}

            <div className="flex justify-between mt-6">
              <label className="text-sm font-medium">
                Password
              </label>

              <button
                type="button"
                className="text-red-500 text-sm"
              >
                Forgot Password?
              </button>
            </div>

            <div className="mt-2 flex items-center border rounded-lg px-4 py-3">
              <input
                type="password"
                placeholder="********"
                className="flex-1 outline-none"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
              />
              <FaEye className="text-gray-400 cursor-pointer" />
            </div>

            {/* Login */}

            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 mt-8 font-medium transition"
            >
              Log In →
            </button>
          </form>

          {/* Signup */}

          <p className="text-center mt-10 text-gray-500 text-sm">
            Don't have an account?{" "}
            <a className="text-red-600 font-semibold cursor-pointer" href="/signup">
              Sign up for Free
            </a>
          </p>

          <div className="mt-12 text-center text-xs text-gray-400">
            © 2024 CineReserve
          </div>

        </div>

      </div>
    </div>
  );
      

};

export default Login;