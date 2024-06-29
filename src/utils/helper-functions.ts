import { fetchMovieByID } from "@/api";
import { MovieProps, MovieSearchProps } from "@/types";
import { LOCAL_STORAGE_MOVIES } from "./constants";

export const doesMovieExist = (
  storedMovie: MovieProps | null,
  storedMovies: MovieProps[],
) => {
  return storedMovies.some((movie: MovieProps) => {
    return movie.imdbID
      ? movie.imdbID === storedMovie?.imdbID
      : movie.Title === storedMovie?.Title;
  });
};

export const bookmarkMovie = (
  storedMovies: MovieProps[],
  newMovie: MovieProps,
  setIsBookmarked: (_: boolean) => void,
) => {
  storedMovies.push(newMovie);
  localStorage.setItem(LOCAL_STORAGE_MOVIES, JSON.stringify(storedMovies));
  setIsBookmarked(true);
};

export const unBookmarkMovie = (
  storedMovies: MovieProps[],
  newMovie: MovieProps,
  setIsBookmarked: (_: boolean) => void,
) => {
  const updatedMovies = storedMovies.filter((movie: MovieProps) =>
    movie.imdbID
      ? movie.imdbID !== newMovie.imdbID
      : movie.Title !== newMovie.Title,
  );

  localStorage.setItem(LOCAL_STORAGE_MOVIES, JSON.stringify(updatedMovies));
  setIsBookmarked(false);

  return updatedMovies;
};

export const fetchMovie = async (
  movie: MovieProps | MovieSearchProps,
  storedMovies: MovieProps[],
  setSelectedMovie: (fetchedMovie: MovieProps) => void,
  setIsBookmarked: (_: boolean) => void,
  setSelectedMovieVisible: (_: boolean) => void,
) => {
  const fetchedMovie = await fetchMovieByID(movie.imdbID);
  setSelectedMovie({ ...fetchedMovie, imdbID: movie.imdbID });

  if (doesMovieExist(fetchedMovie, storedMovies)) {
    setIsBookmarked(true);
  } else {
    setIsBookmarked(false);
  }

  setSelectedMovieVisible(true);
};

export const isValidUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (error) {
    return false;
  }
};
