"use client";

import { fetchMovieByID, fetchMovies } from "@/api";
import { LogoButton } from "@/components/Buttons/LogoButton";
import { BookmarkIcon } from "@/components/Icons/BookmarkIcon";
import Modal from "@/components/Modals";
import { Navbar } from "@/components/Navbar";
import useDebounce from "@/hooks/useDebounce";
import { MovieProps, MovieSearchProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [OMDbMovies, setOMDbMovies] = useState<MovieSearchProps[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);

  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setOMDbMovies([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMovies(debouncedQuery);
        setOMDbMovies(data);
      } catch (err) {
        setError("Failed to fetch movie data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const storedMovies =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIES) || "[]");

  const doesMovieExist = (storedMovie: MovieProps) => {
    return storedMovies.some((movie: MovieProps) => {
      return movie.imdbID === storedMovie.imdbID;
    });
  };

  const onSaveMovie = (newMovie: MovieProps) => {
    if (!doesMovieExist(newMovie)) {
      storedMovies.push(newMovie);
      localStorage.setItem(LOCAL_STORAGE_MOVIES, JSON.stringify(storedMovies));
      setIsSaved(true);
    } else {
      const updatedMovies = storedMovies.filter(
        (movie: MovieProps) => movie.imdbID !== newMovie.imdbID
      );
      localStorage.setItem(LOCAL_STORAGE_MOVIES, JSON.stringify(updatedMovies));
      setIsSaved(false);
    }
  };

  const handleOpenMovieModal = async (movie: MovieSearchProps) => {
    setIsMovieModalVisible(!isMovieModalVisible);

    const fetchedMovie = await fetchMovieByID(movie.imdbID);
    setSelectedMovie({ ...fetchedMovie, imdbID: movie.imdbID });

    if (doesMovieExist(fetchedMovie)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  };

  return (
    <main>
      <Navbar value={query} onChange={handleOnChange} onAddMovie={() => {}} />
      <div className="w-full h-full">
        <div className="content-container">
          {OMDbMovies && OMDbMovies.length > 0 && (
            <div className="omdb-wrapper">
              <ul className="omdb-list">
                {OMDbMovies.map((movie, index) => (
                  <button
                    key={index}
                    className="omdb-button"
                    onClick={() => handleOpenMovieModal(movie)}
                  >
                    <li className="omdb-item">
                      <div className="omdb-info">
                        <img
                          src={movie?.Poster}
                          width={50}
                          height={75}
                          alt={`${movie.Title} Poster`}
                        />
                        <h2 className="ml-2 font-bold">
                          {movie.Title} ({movie.Year})
                        </h2>
                      </div>
                      <div></div>
                    </li>
                  </button>
                ))}
              </ul>
            </div>
          )}

          {loading && (
            <div className="flex justify-center mt-96">
              <div className="loader"></div>
            </div>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>

      <Modal
        isVisible={isMovieModalVisible}
        onClose={() => setIsMovieModalVisible(!isMovieModalVisible)}
      >
        <div className="flex flex-col relative">
          <h1 className="text-4xl font-bold w-full">{selectedMovie?.Title}</h1>
          <span className="capitalize">
            {selectedMovie?.Type} ∙ {selectedMovie?.Year}
          </span>

          <LogoButton
            className="absolute bottom-0 left-0"
            onClick={() => selectedMovie && onSaveMovie(selectedMovie)}
          >
            <BookmarkIcon fill={isSaved ? "black" : "none"} />
          </LogoButton>

          <div className="flex flex-row pt-2">
            <div className="w-full">
              <img
                src={selectedMovie?.Poster}
                alt={`${selectedMovie?.Title} Poster`}
              />
            </div>

            <div className="pl-4">
              <h3 className="mb-2">
                <b>Plot</b>
                <br />
                {selectedMovie?.Plot}
              </h3>

              <h3 className="mb-10">
                <b>IMDb Rating</b>
                <br />
                {selectedMovie?.imdbRating}
              </h3>

              <h3 className="mb-2">
                <b>Director</b>
                <br />
                {selectedMovie?.Director}
              </h3>

              <h3 className="mb-10">
                <b>Actors</b>
                <br />
                {selectedMovie?.Actors}
              </h3>

              <h3 className="mb-2">
                <b>Language</b>
                <br />
                {selectedMovie?.Language}
              </h3>

              <h3 className="mb-2">
                <b>Country</b>
                <br />
                {selectedMovie?.Country}
              </h3>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
