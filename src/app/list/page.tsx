"use client";

import { MovieProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import { useState } from "react";

export default function List() {
  const storedMovies =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIES) || "[]");

  const [movies, setMovies] = useState<MovieProps[] | null>(storedMovies);

  return (
    <div>
      {storedMovies && storedMovies.length > 0 && (
        <button
          onClick={() => {
            localStorage.clear();
            setMovies([]);
          }}
        >
          Delete all
        </button>
      )}

      {/* <button
        onClick={() => {
          localStorage.clear();
          localStorage.getItem(LOCAL_STORAGE_MOVIES);
          console.log(storedMovies);
        }}
      >
        clear
      </button> */}

      {movies && movies.length > 0 && (
        <div>
          <ul>
            {movies.map((movie, index) => (
              <button key={index} onClick={() => {}}>
                <li>
                  <div>
                    <img
                      src={movie?.Poster}
                      width={50}
                      height={75}
                      alt={`${movie?.Title} Poster`}
                    />
                    <h2>
                      {movie?.Title} ({movie?.Year})
                    </h2>
                  </div>
                </li>
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
