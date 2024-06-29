"use server";

import { MovieSearchProps } from "@/types";
import { BASE_URL } from "@/utils/constants";
import { isValidUrl } from "@/utils/helper-functions";

export async function fetchMovieByTitle(query: string) {
  try {
    const res = await fetch(`${BASE_URL}&t=${query}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMovieByID(query: string) {
  try {
    const res = await fetch(`${BASE_URL}&i=${query}`);
    const data = await res.json();

    return isValidUrl(data.Poster) ? data : { ...data, Poster: "" };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMovies(query: string) {
  try {
    let data;
    const res = await fetch(`${BASE_URL}&s=${query}`);
    data = await res.json();

    if (data.Response === "False") {
      const res = await fetch(`${BASE_URL}&i=${query}`);
      data = await res.json();
    }

    if (data.Response === "True") {
      if (data.Search && Array.isArray(data.Search)) {
        const validatedData = data.Search.map((item: MovieSearchProps) => {
          return {
            ...item,
            Poster: isValidUrl(item.Poster) ? item.Poster : "",
          };
        });

        return validatedData;
      }

      if (data && typeof data === "object") {
        return [data];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}
