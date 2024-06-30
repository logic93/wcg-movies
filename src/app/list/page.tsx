"use client";

import MovieContent from "@/components/Content/MovieContent";
import Modal from "@/components/Modals";
import { Navbar } from "@/components/Navbar";
import { MovieProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import {
  bookmarkMovie,
  doesMovieExist,
  fetchMovie,
  isValidUrl,
  unBookmarkMovie,
} from "@/utils/helper-functions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import PosterPlaceholder from "@/app/assets/images/poster-placeholder.png";
import { LogoButton } from "@/components/Buttons/LogoButton";
import { CloseIcon } from "@/components/Icons/CloseIcon";

export default function List() {
  const storedMovies =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIES) || "[]");

  const defaultCustomMovieProps = {
    Title: "",
    Year: "",
    Type: "",
    Poster: "",
    Plot: "",
  };

  const [myMovies, setMyMovies] = useState<MovieProps[] | null>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);
  const [selectedMovieVisible, setSelectedMovieVisible] = useState(false);
  const [deleteAllModalVisible, setDeleteAllModalVisible] = useState(false);
  const [customMovieModalVisible, setCustomMovieModalVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [customMovieAlreadyExist, setCustomMovieAlreadyExist] = useState(false);
  const [customMovie, setCustomMovie] = useState<MovieProps>(
    defaultCustomMovieProps,
  );

  useEffect(() => {
    setMyMovies(storedMovies);
  }, []);

  const onStoreMovie = (newMovie: MovieProps) => {
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

  const handleOnDeleteAll = () => {
    if (myMovies && myMovies?.length > 0) {
      localStorage.clear();
      setMyMovies([]);
      setDeleteAllModalVisible(false);
    }
  };

  const handleOnChangeCustomMovie = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setCustomMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));

    if (customMovieAlreadyExist) {
      setCustomMovieAlreadyExist(false);
    }
  };

  const handleOnSaveCustomMovie = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!doesMovieExist(customMovie, storedMovies)) {
      const updatedCustomMovie = {
        ...customMovie,
        Title: customMovie.Title.trim() || "N/A",
        Plot: customMovie.Plot.trim() || "N/A",
        Year: customMovie.Year.trim() || "N/A",
        Type: customMovie.Type.trim() || "N/A",
        Poster: isValidUrl(customMovie?.Poster) ? customMovie?.Poster : "",
      };

      bookmarkMovie(storedMovies, updatedCustomMovie, setIsBookmarked);
      setMyMovies(storedMovies);
      setCustomMovieModalVisible(false);
    } else {
      setCustomMovieAlreadyExist(true);
    }
  };

  return (
    <>
      <Navbar
        isMainPage={false}
        navContentClassName="justify-between px-4"
        showDelete
        disabled={!myMovies?.length}
        onAddMovie={() => {
          setCustomMovie(defaultCustomMovieProps);
          setCustomMovieAlreadyExist(false);
          setCustomMovieModalVisible(true);
        }}
        onDeleteAll={() => setDeleteAllModalVisible(true)}
      />

      <div className="mx-auto h-full max-w-7xl pt-20">
        <div className="flex h-full w-full items-center justify-center">
          <ul className="grid w-full grid-cols-2 gap-4 overflow-y-auto p-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {myMovies &&
              myMovies?.length > 0 &&
              myMovies?.map((movie, index) => (
                <li key={index} className="relative flex flex-col items-center">
                  <button
                    className="relative h-full overflow-hidden outline-none"
                    onClick={() => {
                      if (movie.imdbID) {
                        fetchMovie(
                          movie,
                          storedMovies,
                          setSelectedMovie,
                          setIsBookmarked,
                          setSelectedMovieVisible,
                        );
                      } else {
                        setSelectedMovie(movie);

                        if (doesMovieExist(movie, storedMovies)) {
                          setIsBookmarked(true);
                        } else {
                          setIsBookmarked(false);
                        }

                        setSelectedMovieVisible(true);
                      }
                    }}
                  >
                    <Image
                      width={278}
                      height={417}
                      src={movie?.Poster || PosterPlaceholder}
                      alt={`${movie?.Title} Poster`}
                      priority
                      className="h-full w-auto transform object-cover transition-transform duration-300 hover:scale-125"
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
          onBookmark={onStoreMovie}
          onClose={() => setSelectedMovieVisible(false)}
        />
      </Modal>

      <Modal
        contentClassName="mx-auto overflow-none rounded h-auto scroll-auto"
        isVisible={deleteAllModalVisible}
        onClose={() => setDeleteAllModalVisible(false)}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <LogoButton
            className="absolute right-1 top-1"
            onClick={() => setDeleteAllModalVisible(false)}
          >
            <CloseIcon width="16" height="16" />
          </LogoButton>

          <h1 className="text-2xl font-bold">Delete</h1>
          <p className="mt-1">Are you sure?</p>
          <p>
            This will remove all movies <br />
            from your list.
          </p>

          <button
            className="mt-8 min-h-11 rounded bg-black px-4 font-bold text-white outline-none"
            onClick={handleOnDeleteAll}
          >
            Delete
          </button>
        </div>
      </Modal>

      <Modal
        contentClassName="bg-[#1F1F1F] max-w-2xl w-full m-auto"
        isVisible={customMovieModalVisible}
        onClose={() => setCustomMovieModalVisible(false)}
      >
        <form onSubmit={handleOnSaveCustomMovie} className="">
          <LogoButton
            className="absolute right-[1rem] top-[1rem]"
            onClick={(e) => {
              e.preventDefault();
              setCustomMovieModalVisible(false);
            }}
          >
            <CloseIcon fill="white" />
          </LogoButton>

          <h1 className="w-[90%] text-4xl font-bold text-white">
            Add new movie
          </h1>

          <div className="mt-2 flex flex-row text-white max-[425px]:flex-col">
            <div className="mr-4 flex flex-1 flex-col max-[425px]:m-0 max-[425px]:mt-4">
              <p>Image</p>
              <Image
                width={278}
                height={417}
                src={
                  isValidUrl(customMovie?.Poster)
                    ? customMovie?.Poster
                    : PosterPlaceholder
                }
                className="h-auto w-auto object-cover"
                priority
                alt="Poster"
                onError={(err) => {
                  if (err) {
                    setCustomMovie({ ...customMovie, Poster: "" });
                  }
                }}
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 max-[425px]:mt-4">
              <div>
                <label htmlFor="Title">Title</label>
                <input
                  required
                  name="Title"
                  onChange={handleOnChangeCustomMovie}
                  value={customMovie.Title}
                  className="custom-input"
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="Plot">Plot</label>
                <textarea
                  required
                  name="Plot"
                  onChange={handleOnChangeCustomMovie}
                  value={customMovie.Plot}
                  className="custom-input min-h-24"
                ></textarea>
              </div>

              <div>
                <label htmlFor="Year">Year</label>
                <input
                  required
                  name="Year"
                  onChange={handleOnChangeCustomMovie}
                  value={customMovie.Year}
                  className="custom-input"
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="Type">Type</label>
                <input
                  required
                  name="Type"
                  onChange={handleOnChangeCustomMovie}
                  value={customMovie.Type}
                  className="custom-input"
                  type="text"
                  placeholder="Movie/Series"
                />
              </div>

              <div>
                <label htmlFor="Poster">Poster</label>
                <input
                  name="Poster"
                  onChange={handleOnChangeCustomMovie}
                  value={customMovie.Poster}
                  className="custom-input"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex w-full flex-row justify-end">
            <button
              disabled={customMovieAlreadyExist}
              type="submit"
              className={`min-h-11 rounded px-4 font-bold outline-none max-[425px]:w-full ${customMovieAlreadyExist ? "bg-transparent px-0 text-white" : "bg-white"}`}
            >
              {customMovieAlreadyExist
                ? "Movie exist already. Please choose another title."
                : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
