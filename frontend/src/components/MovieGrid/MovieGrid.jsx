// import { movies } from "../../data/movies";
import MovieCard from "../MovieCard/MovieCard";
import axios from "axios";

export default function MovieGrid( {movies} ) {
  

  return (
    <div className="grid mt-8 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

      {movies.map((movie) => (
        <MovieCard
          key={movie.Title}
          movie={movie}
        />
      ))}

    </div>
  );
}