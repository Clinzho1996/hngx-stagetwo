/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiHeart, FiHeartFill, FiPlay } from "react-icons/fi";
import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import axios from "axios";
import format from "date-fns/format";
import Navbar from "./components/Navbar";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import MovieCard from "./components/MovieCard";
import Footer from "./components/Footer";

const Home = () => {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY;
  const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const fetchMovie = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const movieData = response.data.results;
      setMovies(movieData.slice(10, 60));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = response.data.results;
        setTopMovies(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTopMovies();
  }, []);

  useEffect(() => {
    fetchMovie();
  }, []);

  // Get a random movie from the fetched movies
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  return (
    <div className="main-section">
      {/* Home Page View */}
      <div className="banner-cover">
        {randomMovie && (
          <div
            className="banner-single"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://image.tmdb.org/t/p/w1280/${randomMovie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "90vh",
              backgroundColor: "#000",
            }}
            key={randomMovie.id}
          >
            <Navbar />
            <div className="banner-details">
              <h2 className="banner-title">{randomMovie.title}</h2>
              <div className="banner-content">
                <div className="imdb">
                  <span className="imbd-btn">
                    <Image src={require("./assets/imdb.png")} />
                    <p> {randomMovie.vote_average}</p>
                  </span>
                  <span className="imbd-btn-two">
                    <Image src={require("./assets/rot.png")} />
                    <p> 97%</p>
                  </span>
                </div>
                <p className="banner-overview">{randomMovie.overview}</p>
              </div>
              <div className="banner-btn-section" style={{ zIndex: 20 }}>
                <Link href="#" className="banner-btn">
                  <AiFillPlayCircle className="icon" />
                  Watch TRAILER
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Featured Movies */}
      <div className="featured">
        <div className="title">
          <h2>Featured Movie</h2>
          <Link href="/">See More </Link>
        </div>
        <div className="movie-grid">
          {topMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
