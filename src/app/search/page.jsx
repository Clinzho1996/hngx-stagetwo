/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set to true initially

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );

        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (router.query) {
      setQuery(router.query);
      fetchData();
    }
  }, [router.query]);

  return (
    <div>
      <h1>Search Results for {query}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
