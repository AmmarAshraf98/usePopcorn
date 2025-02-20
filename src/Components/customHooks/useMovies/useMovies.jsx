import { useEffect, useState } from "react";
const apiKey = "f87a9968";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovie({ signal }) {
      try {
        setError("");
        setloading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal }
        );

        if (!res.ok)
          throw new Error("something went wrong when fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setloading(false);
      } catch (error) {
        setMovies([]);
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setloading(false);
      }
    }

    if (query.length < 3) {
      setError("");
      setMovies([]);
      setloading(false);
      return;
    }

    // use abortController to cancel fetch request to provide better performance
    const controller = new AbortController();
    getMovie(controller);

    return () => {
      // this how to cansle fetch request
      controller.abort();
    };
  }, [query]);
  return { movies, loading, error };
}
