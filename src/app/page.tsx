"use client";

import { fetchMovie } from "@/api";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

interface MovieData {
  Title: string;
  Plot: string;
  Poster: string;
  Year: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [OMDbMovies, setOMDbMovies] = useState<MovieData[]>([]);
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
        const data = await fetchMovie(debouncedQuery);
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

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleOnChange}
        placeholder="Search"
      />

      {OMDbMovies && (
        <ul>
          {OMDbMovies.map((movie, index) => (
            <li key={index}>
              <a>
                <div className="flex flex-row">
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
              </a>
            </li>
          ))}
        </ul>
      )}

      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
