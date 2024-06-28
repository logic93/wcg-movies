"use client";

import { Navbar } from "@/components/Navbar";
import { MovieProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import { useState } from "react";

export default function List() {
  const storedMovies =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIES) || "[]");

  const [movies, setMovies] = useState<MovieProps[]>(storedMovies);

  return (
    <>
      <Navbar
        onAddMovie={() => {}}
        isMainPage={false}
        showDelete
        onDeleteAll={() => {
          if (movies?.length > 0) {
            localStorage.clear();
            setMovies([]);
            console.log("delete");
          }
        }}
      />

      <div className="mx-auto h-full max-w-7xl">
        <div className="flex h-full w-full items-center justify-center">
          <ul className="grid w-full grid-cols-2 gap-4 overflow-y-auto py-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies?.map((movie, index) => (
              <li key={index} className="relative flex flex-col items-center">
                <button
                  onClick={() => {}}
                  className="relative overflow-hidden focus:outline-none"
                >
                  <img
                    width={200}
                    height={300}
                    src={movie?.Poster}
                    alt={`${movie?.Title} Poster`}
                    className="transform object-cover transition-transform duration-300 hover:scale-125"
                  />
                  <h1 className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-1 text-center text-white">
                    {movie?.Title} ({movie?.Year})
                  </h1>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
