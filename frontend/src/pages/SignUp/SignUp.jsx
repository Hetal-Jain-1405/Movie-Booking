import { FaEnvelope, FaEye, FaTicketAlt, FaUser } from "react-icons/fa";
import cinema from '../../assets/cinema.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate(); // navigate function to redirect after successful login


  console.log(8+2)
  const handleLogin = async (e) => {
    console.log(name)
    e.preventDefault(); //won't refresh the react page after form submission

    try {
      const response = await axios.post('http://127.0.0.1:8000/users/new/', {
        name: name,
        email: email,
        password: password
      })
      console.log('Sign Up successful:', response.data);

      localStorage.setItem('access_token', response.data.access_token);

      alert('Sign Up successful!'); 
      navigate('/home');
    }
    catch (error) {
      console.error('Error during sign up:', error);
      alert('An error occurred during sign up. Please try again.');
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
            Sign Up to manage your reservations
            <br />
            and explore new releases.
          </p>

          <form className="mt-10" onSubmit={handleLogin}>

            {/*Name*/}

            <label className="text-sm font-medium">
              Full Name
            </label>

            <div className="mt-2 flex items-center border rounded-lg px-4 py-3">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 outline-none"
                value = {name}
                onChange = {(e) => setName(e.target.value)}
              />
              <FaUser className="text-gray-400" />
            </div>

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

            {/* Sign Up */}

            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 mt-8 font-medium transition"
            >
              Sign Up →
            </button>
          </form>

          <div className="mt-12 text-center text-xs text-gray-400">
            © 2024 CineReserve
          </div>

        </div>

      </div>
    </div>
  );
      

};

export default SignUp;