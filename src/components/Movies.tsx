import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Movie {
  id: number;
  title: string;
  runtime: number;
  description: string;
  mpaaRating: string;
  rating: number;
  releaseDate: string;
  year: number;
  genres?: Array<string>;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = () => {
    fetch("http://localhost:8080/v1/movies")
      .then((res) => res.json())
      .then((json) => {
        setMovies([...json.movies]);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(true);
      });
  };

  return (
    <>
      <h2>Choose a movie</h2>
      {error && <div>Something went wrong...</div>}
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <div className="list-group">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`} className="list-group-item list-group-item-action">
              {movie.title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Movies;
