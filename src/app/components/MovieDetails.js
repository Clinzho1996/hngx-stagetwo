// components/MovieDetails.js
import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import { AiFillPlayCircle } from "react-icons/ai";
import Footer from "./Footer";
import format from "date-fns/format";

function MovieDetails({ movie }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "do MMMM, yyyy");
  };
  return (
    <div>
      <div
        className="banner-single"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "60vh",
          backgroundColor: "#000",
        }}
        key={movie.id}
      >
        <Navbar />
        <div className="movie-inner" style={{ zIndex: 20 }}>
          <Link href="#" className="banner-btn">
            <AiFillPlayCircle className="icon" />
            <p>Watch Trailer</p>
          </Link>
        </div>
      </div>
      <div className="movie-details">
        <h2 data-testid="movie-title">{movie.title}</h2>
        <p data-testid="movie-release-date" className="release">
          {`Release Date: ${formatDate(movie.release_date)} `}
        </p>
        <p data-testid="movie-runtime" className="release">
          Runtime: {movie.runtime} minutes
        </p>
        <p data-testid="movie-overview">{movie.overview}</p>
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetails;
