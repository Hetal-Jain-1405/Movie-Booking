import { useState, useEffect } from 'react'


function useGetMovies() {

  const [movies, setMovies] = useState([])
  useEffect(() => {
    fetch('http://127.0.0.1:8000/movies/all/')
    .then((res) => res.json())
    .then((res) => setMovies(res))
    console.log(movies)
    }, [])
    return movies
}

export default useGetMovies