"use server";

import { BASE_URL } from "@/utils/constants";

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
    return await res.json();
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
        return data.Search;
      }

      if (data && typeof data === "object") {
        return [data];
      }
    }
  } catch (error) {
    console.log(error);
  }
}
