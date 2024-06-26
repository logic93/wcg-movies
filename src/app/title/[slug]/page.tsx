"use client";

import { fetchMovieByID } from "@/api";
import { useEffect, useState } from "react";

export default function Movie({ params }: { params: { slug: string } }) {
  const [movieDetails, setMovieDetails] = useState([]);

  async function getMovie() {
    const item = await fetchMovieByID(params.slug); // cache MISS
    setMovieDetails(item);
  }

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      imdbID: {params.slug}
      <img
        src={movieDetails?.Poster}
        width={500}
        height={750}
        alt={`${movieDetails.Title} Poster`}
      />
    </div>
  );
}
