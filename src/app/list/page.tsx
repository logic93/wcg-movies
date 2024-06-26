"use client";

import { MovieTvProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import { useState } from "react";

export default function List() {
  const storedMovies = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_MOVIES) || "[]"
  );

  const [movies, setMovies] = useState<MovieTvProps[]>(storedMovies);

  return (
    <div>
      {storedMovies.length > 0 && (
        <button
          onClick={() => {
            localStorage.clear();
            setMovies([]);
          }}
        >
          Delete all
        </button>
      )}

      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <a>
              <div className="flex flex-row">
                <img
                  src={movie?.Poster}
                  width={150}
                  height={225}
                  alt={`${movie.Title} Poster`}
                />
                <div>
                  <h2>
                    {movie.Title} ({movie.Year})
                  </h2>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
