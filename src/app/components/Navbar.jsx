/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Import from 'next/router' instead of 'next/navigation'
import Image from "next/image";
import axios from "axios"; // Import axios
import Link from "next/link";
import MovieCard from "./MovieCard";

const Navbar = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  // Load the search text from localStorage on component mount
  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText");
    if (savedSearchText) {
      setValue(savedSearchText);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (value) {
      // Save the search text to localStorage
      localStorage.setItem("searchText", value);

      // Navigate to the search page
      router.push("/search", { state: value, replace: true });

      // Clear the input field
      setValue("");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link href="/">
            <Image
              src={require("../assets/tv.png")}
              alt="logo"
              width={50}
              height={50}
            />
            <h2>MovieBox</h2>
          </Link>
        </div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">
            <FiSearch color="#fff" size={20} />
          </button>
        </form>
        <div className="signin">
          <h2>Sign in</h2>
          <Image
            src={require("../assets/Menu.png")}
            alt="sign in"
            width={30}
            height={30}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
