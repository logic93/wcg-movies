"use client";

import { fetchMovies } from "@/api";
import { LogoButton } from "@/components/Buttons/LogoButton";
import MovieContent from "@/components/Content/MovieContent";
import OMDbDropdown from "@/components/Dropdowns/OMDbDropdown";
import WCGMovieIcon from "@/components/Icons/WCGMoviesIcon";
import Modal from "@/components/Modals";
import { Navbar } from "@/components/Navbar";
import useDebounce from "@/hooks/useDebounce";
import { MovieProps, MovieSearchProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import {
  bookmarkMovie,
  doesMovieExist,
  fetchMovie,
  unBookmarkMovie,
} from "@/utils/helper-functions";
import { useEffect, useState } from "react";

export default function Home() {
  const storedMovies =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOVIES) || "[]");

  const [query, setQuery] = useState("");
  const [OMDbMovies, setOMDbMovies] = useState<MovieSearchProps[]>([]);
  const [omdbVisible, setOmbdVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);
  const [selectedMovieVisible, setSelectedMovieVisible] = useState(false);
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
      }, 300);
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

  const handleOnBookmark = (newMovie: MovieProps) => {
    if (!doesMovieExist(newMovie, storedMovies)) {
      bookmarkMovie(storedMovies, newMovie, setIsBookmarked);
    } else {
      unBookmarkMovie(storedMovies, newMovie, setIsBookmarked);
    }
  };

  return (
    <>
      <Navbar
        value={query}
        onChange={handleOnChange}
        onFocus={() => {
          if (query && !omdbVisible) {
            fetchData();
          }
        }}
      />
      <LogoButton className="fixed bottom-0 left-0 w-1/2">
        <WCGMovieIcon />
      </LogoButton>

      <div className="h-screen w-full">
        <div className="content-container">
          <OMDbDropdown
            isVisible={omdbVisible}
            isLoading={loading}
            data={OMDbMovies}
            onClick={(movie) => {
              fetchMovie(
                movie,
                storedMovies,
                setSelectedMovie,
                setIsBookmarked,
                setSelectedMovieVisible,
              );
            }}
            onClose={() => setOmbdVisible(false)}
          />
        </div>
      </div>

      <Modal
        isVisible={selectedMovieVisible}
        onClose={() => setSelectedMovieVisible(false)}
      >
        <MovieContent
          selectedMovie={selectedMovie}
          isBookmarked={isBookmarked}
          onBookmark={handleOnBookmark}
          onClose={() => setSelectedMovieVisible(false)}
        />
      </Modal>
    </>
  );
}
