import { useNavigate } from "react-router";

export default function MovieCard({ movie }) {
    const navigate = useNavigate();

    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow hover:scale-105 transition"
            onClick = {() => navigate(`/movie/${movie.imdbID}`)}>
  
        <img
          src={movie.Poster}
          className="h-72 w-full object-cover"
        />
  
        <div className="p-4">
  
          <h2 className="font-bold">
            {movie.Title}
          </h2>
  
          <p className="text-gray-500 text-sm mt-2">
            {movie.Genre} • ⭐ {movie.imdbRating} / 10
          </p>
  
        </div>
  
      </div>
    );
  }