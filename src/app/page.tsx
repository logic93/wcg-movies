"use client";

import { fetchMovieByID, fetchMovies } from "@/api";
import { LogoButton } from "@/components/Buttons/LogoButton";
import MovieContent from "@/components/Content/MovieContent";
import OMDbDropdown from "@/components/Dropdowns/OMDbDropdown";
import WCGMovieIcon from "@/components/Icons/WCGMoviesIcon";
import Modal from "@/components/Modals";
import { Navbar } from "@/components/Navbar";
import useDebounce from "@/hooks/useDebounce";
import { MovieProps, MovieSearchProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [OMDbMovies, setOMDbMovies] = useState<MovieSearchProps[]>([]);
  const [omdbVisible, setOmbdVisible] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);
  const [selectedMovieVisible, setSelectedMovieVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  const fetchData = async () => {
    try {
      const data = await fetchMovies(debouncedQuery);

      if (data.length > 0) {
        setLoading(true);
        setOMDbMovies(data);
        setOmbdVisible(true);
      }
    } catch (err) {
      setOMDbMovies([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setOMDbMovies([]);
      return;
    }

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
      setIsBookmarked(true);
    } else {
      const updatedMovies = storedMovies.filter(
        (movie: MovieProps) => movie.imdbID !== newMovie.imdbID,
      );
      localStorage.setItem(LOCAL_STORAGE_MOVIES, JSON.stringify(updatedMovies));
      setIsBookmarked(false);
    }
  };

  const handleOpenMovieModal = async (movie: MovieSearchProps) => {
    setOMDbMovies([]);
    setQuery("");
    setOmbdVisible(false);

    const fetchedMovie = await fetchMovieByID(movie.imdbID);
    setSelectedMovie({ ...fetchedMovie, imdbID: movie.imdbID });

    if (doesMovieExist(fetchedMovie)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }

    setSelectedMovieVisible(!selectedMovieVisible);
  };

  const handleCloseMovieModal = () => {
    setSelectedMovieVisible(false);
  };

  return (
    <main>
      <Navbar
        value={query}
        onChange={handleOnChange}
        onAddMovie={() => {}}
        onFocus={() => {
          if (query && !omdbVisible) {
            fetchData();
          }
        }}
      />
      <LogoButton className="fixed bottom-0 left-0 w-1/2">
        <WCGMovieIcon />
      </LogoButton>

      {/* <h1 className="text-5xl font-bold text-white">WCG</h1> */}
      <div className="h-full w-full">
        <div className="content-container">
          <OMDbDropdown
            isVisible={omdbVisible}
            isLoading={loading}
            data={OMDbMovies}
            onClick={(movie) => handleOpenMovieModal(movie)}
            onClose={() => setOmbdVisible(false)}
          />
        </div>
      </div>

      <Modal isVisible={selectedMovieVisible} onClose={handleCloseMovieModal}>
        <MovieContent
          selectedMovie={selectedMovie}
          isBookmarked={isBookmarked}
          onSaveMovie={onSaveMovie}
        />
      </Modal>
    </main>
  );
}
