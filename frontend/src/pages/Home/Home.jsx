import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import CategoryTabs from "../../components/CategoryTabs/CategoryTabs";
import FilterBar from "../../components/FilterBar/FilterBar";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
           const token = localStorage.getItem('acess_token');

            const response = await axios.get('http://127.0.0.1:8000/movies/all', {
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
      <Navbar />
      <Hero />

      <div className="mt-8 flex justify-between items-center">
        <CategoryTabs />
        <FilterBar />
      </div>

      <MovieGrid movies = {movies}/>
    </div>
  );
}