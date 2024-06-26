"use client";

import { fetchMovies } from "@/api";
import useDebounce from "@/hooks/useDebounce";
import { MovieTvProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [OMDbMovies, setOMDbMovies] = useState<MovieTvProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const onSaveMovie = (newMovie: MovieTvProps) => {
    const existingMovies = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_MOVIES) || "[]"
    );

    const movieExists = existingMovies.some((movie: any) => {
      return movie.imdbID === newMovie.imdbID;
    });

    if (!movieExists) {
      existingMovies.push(newMovie);
      localStorage.setItem(
        LOCAL_STORAGE_MOVIES,
        JSON.stringify(existingMovies)
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleOnChange}
        placeholder="Search"
      />

      <Link href="/list">My Movies</Link>

      {OMDbMovies && (
        <ul>
          {OMDbMovies.map((movie, index) => (
            <li key={index}>
              <Link href={`/title/${movie.imdbID}`} prefetch={true}>
                <div className="flex flex-row">
                  <button onClick={() => onSaveMovie(movie)}>Save</button>
                  <img
                    src={movie?.Poster}
                    width={50}
                    height={75}
                    alt={`${movie.Title} Poster`}
                  />
                  <div>
                    <h2>
                      {movie.Title} ({movie.Year})
                    </h2>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
