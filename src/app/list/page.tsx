"use client";

import MovieContent from "@/components/Content/MovieContent";
import Modal from "@/components/Modals";
import { Navbar } from "@/components/Navbar";
import { MovieProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import {
  bookmarkMovie,
  doesMovieExist,
  toggleBookmark,
  unBookmarkMovie,
} from "@/utils/helperFunctions";
import { useEffect, useState } from "react";

export default function List() {
  const storedMovies =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIES) || "[]");

  const [myMovies, setMyMovies] = useState<MovieProps[] | null>([]);

  useEffect(() => {
    setMyMovies(storedMovies);
  }, []);

  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);
  const [selectedMovieVisible, setSelectedMovieVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const onHandleBookmark = (newMovie: MovieProps) => {
    if (!doesMovieExist(newMovie, storedMovies)) {
      bookmarkMovie(storedMovies, newMovie, setIsBookmarked);
      setMyMovies(storedMovies);
    } else {
      const updatedMovies = unBookmarkMovie(
        storedMovies,
        newMovie,
        setIsBookmarked,
      );
      setMyMovies(updatedMovies);
    }
  };

  return (
    <>
      <Navbar
        onAddMovie={() => {}}
        isMainPage={false}
        showDelete
        onDeleteAll={() => {
          // if (movies?.length > 0) {
          //   localStorage.clear();
          //   setMyMovies([]);
          //   console.log("delete");
          // }
        }}
      />

      <div className="mx-auto h-full max-w-7xl">
        <div className="flex h-full w-full items-center justify-center">
          <ul className="grid w-full grid-cols-2 gap-4 overflow-y-auto py-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {myMovies?.map((movie, index) => (
              <li key={index} className="relative flex flex-col items-center">
                <button
                  onClick={() => {
                    toggleBookmark(
                      movie,
                      storedMovies,
                      setSelectedMovie,
                      setIsBookmarked,
                      setSelectedMovieVisible,
                    );
                  }}
                  className="relative h-full overflow-hidden focus:outline-none"
                >
                  <img
                    src={movie?.Poster}
                    alt={`${movie?.Title} Poster`}
                    className="h-full w-[200px] transform object-cover transition-transform duration-300 hover:scale-125"
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

      <Modal
        isVisible={selectedMovieVisible}
        onClose={() => setSelectedMovieVisible(false)}
      >
        <MovieContent
          selectedMovie={selectedMovie}
          isBookmarked={isBookmarked}
          onBookmark={onHandleBookmark}
        />
      </Modal>
    </>
  );
}
