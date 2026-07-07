import axios from "axios"
import { useState, useEffect } from "react"


export default function MovieName({imdbID}) {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [movie, setMovie] = useState([])

    useEffect(() => {
        const fetchMovieDetails = async() => {
            const token = localStorage.getItem('access_token')
            const response = await axios.get(`${backendUrl}/movies/id/${imdbID}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMovie(response.data)
        }
        fetchMovieDetails()
    },[])

    return (
        <>
            <img
                src={movie.Poster}
                className="w-32 rounded-xl shadow-lg object-cover"
            />
              
            <div>
              
                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                    Now Booking
                </span>
              
                <h1 className="text-5xl font-bold mt-2">
                    {movie.Title}
                </h1>
              
                <p className="text-gray-500 mt-4">
                    {movie.Runtime} • {movie.Genre}
                </p>
              
            </div>
        </>
    )
}