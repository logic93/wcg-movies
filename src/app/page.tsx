"use client";

import { fetchMovieByID, fetchMovies } from "@/api";
import MovieContent from "@/components/Content/MovieContent";
import OMDbDropdown from "@/components/Dropdowns/OMDbDropdown";
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

  useEffect(() => {
    if (!debouncedQuery) {
      setOMDbMovies([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetchMovies(debouncedQuery);
        setOmbdVisible(true);
        setOMDbMovies(data);
      } catch (err) {
        setOMDbMovies([]);
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
    // setSelectedMovie(null);
  };

  return (
    <main>
      <Navbar value={query} onChange={handleOnChange} onAddMovie={() => {}} />
      <div className="h-full w-full">
        <div className="content-container">
          <OMDbDropdown
            isVisible={omdbVisible}
            isLoading={loading}
            data={OMDbMovies}
            onClick={(movie) => handleOpenMovieModal(movie)}
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
