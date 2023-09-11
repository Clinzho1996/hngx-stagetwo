/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(query);
    console.log("Encoded query:", encodedQuery);
    router.push(`/search?query=${encodedQuery}`);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
          <Image src={require("../assets/tv.png")} alt="logo" />
          <h2>MovieBox</h2>
        </Link>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="What do you want to watch ?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FiSearch color="#fff" size={20} />
        </button>
      </form>
      <div className="signin">
        <h2>Sign in</h2>
        <Image src={require("../assets/Menu.png")} alt="sign in" />
      </div>
    </nav>
  );
};

export default Navbar;
