import {
    Star
  } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ShowTimings from "../../components/ShowTimings/ShowTimings";
import { useRef } from "react";
  
  export default function MovieDetails() {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {id}  = useParams(); 
    const [movie, setMovie] = useState([]);
    const showTimesRef = useRef(null);
    useEffect(() => {

        const fetchMovieDetails = async() => {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${backendUrl}/movies/id/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMovie(response.data);
            console.log(response.data);
        }

        fetchMovieDetails();
    }, []);

    return (
        
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-[260px_1fr] gap-12">
  
          {/* Poster */}
          <div>
            <img
              src={movie.Poster}
              alt="movie"
              className="rounded-xl shadow-lg w-full h-[380px] object-cover"
            />
          </div>
  
          {/* Movie Info */}
          <div>
  
  
            <h1 className="text-5xl font-bold">
              {movie.Title}
            </h1>
  
            {/* Rating */}
            <div className="flex items-center gap-4 mt-5 text-gray-600">
  
              <div className="flex items-center gap-1">
                <Star
                  size={18}
                  className="fill-red-500 text-red-500"
                />
                <span className="font-semibold text-black">
                  {movie.imdbRating} / 10
                </span>
              </div>
  
              <span>•</span>
  
              <span>{movie.Runtime}</span>
  
            </div>
            <div className="mt-5 text-gray-600">
                Genre: {movie.Genre}
            </div>
  
            {/* Synopsis */}
            <div className="mt-4">
              <h2 className="font-bold text-2xl mb-4">
                Synopsis
              </h2>
  
              <p className="text-gray-600 leading-8 max-w-2xl">
                {movie.Plot}
              </p>
            </div>
  
            {/* Buttons */}
            <div className="flex gap-5 mt-4">
  
              <button 
                className="bg-red-600 hover:bg-red-700 transition text-white px-8 py-3 rounded-lg flex items-center gap-2 font-semibold"
                onClick={() => showTimesRef.current.scrollIntoView({ behavior: "smooth", })}>
                Book Tickets
              </button>
  
            </div>
  
          </div>
        </div>
  
        {/* Cast */}
        <div className="mt-20">
  
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Cast & Crew
            </h2>
          </div>
          <div>
            <p>Actors: {movie.Actors}</p>
            <p>Director: {movie.Director}</p>
            <p>Writers: {movie.Writer}</p>
          </div>
        </div>

        <div ref={showTimesRef}>
          <ShowTimings imdbId = {id}/>
        </div>

      </div>
    );
  }