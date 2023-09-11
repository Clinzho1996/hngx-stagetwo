"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import MovieDetails from "@/app/components/MovieDetails";

function MovieDetailsPage({ params }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const TMDB_API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const movieData = response.data;
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id, TMDB_API_KEY]);

  // Check if 'id' exists and is not undefined
  if (id === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isLoading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
      {isError && <p>Error fetching data</p>}
      {movie && <MovieDetails movie={movie} />}
    </div>
  );
}

export default MovieDetailsPage;
