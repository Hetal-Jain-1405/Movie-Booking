import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import CategoryTabs from "../../components/CategoryTabs/CategoryTabs";
import FilterBar from "../../components/FilterBar/FilterBar";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
           const token = localStorage.getItem('access_token');

            const response = await axios.get(`${backendUrl}/movies/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMovies(response.data);
            console.log(response.data);
        }
        fetchMovies();
    }, []);


  return (
    <div className="max-w-7xl mx-auto px-6 py-5">
      <Hero />

      <div className="mt-8 flex justify-between items-center">
        <CategoryTabs />
        <FilterBar />
      </div>

      <MovieGrid movies = {movies}/>
    </div>
  );
}