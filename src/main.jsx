import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Navbar } from "./Components/Navbar/Navbar";
import { Box } from "./Components/Box/Box";
import { WatchedList } from "./Components/WatchedList/WatchedList";
import { Summary } from "./Components/Summary/Summary";
import { Input } from "./Components/Input/Input";
import { NumResult } from "./Components/NumResult/NumResult";
import { MovieList } from "./Components/MovieList/MovieList";
import { Main } from "./Components/Main/Main";
import Loadear from "./Components/Loadear/Loadear";
import ErrorMsg from "./Components/ErrorMsg/ErrorMsg";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import { useMovies } from "./Components/customHooks/useMovies/useMovies";
import { useLocalStorage } from "./Components/customHooks/useLocalStorage/useLocalStorage";

const apiKey = "f87a9968";

export default function App() {
  // const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState(() => {
  //   const x = JSON.parse(localStorage.getItem("Watched"));
  //   if (x) return x;
  //   else return [];
  // });
  // const [loading, setloading] = useState(true);
  // const [error, setError] = useState("");

  const [value, setValue] = useLocalStorage("Watched", []);

  const [query, setQuery] = useState("");

  const [selectedID, setSelectedID] = useState(null);

  const { movies, loading, error } = useMovies(query);

  // handle SelectedId
  function handleSelectedMovie(id) {
    setSelectedID((selectedId) => (selectedID === id ? null : id));
  }

  // handle add to watched
  function handleAddToWatched(movie) {
    // add to watched
    // setWatched((movies) => movies.filter((movie) => movie.imdbID === id));
    setValue((movies) => [...movies, movie]);
  }

  // handle delete movie from watched list
  function deleteMovie(id) {
    setValue((movie) => movie.filter((m) => m.imdbID !== id));
  }

  // -------------- before customHooks -----------------------------
  // useEffect(() => {
  //   if (query.length < 3) {
  //     setError("");
  //     setMovies([]);
  //     setloading(false);
  //     return;
  //   }

  //   // use abortController to cancel fetch request to provide better performance
  //   const controller = new AbortController();
  //   getMovie(controller);

  //   return () => {
  //     // this how to cansle fetch request
  //     controller.abort();
  //   };
  // }, [query]);

  return (
    <>
      <Navbar>
        <Input query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {loading && <Loadear />}
          {!loading && !error && (
            <MovieList
              onSelectedMovie={handleSelectedMovie}
              onOpenDetails={setSelectedID}
              movies={movies}
            />
          )}
          {error && <ErrorMsg message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              watched={value}
              movieID={selectedID}
              onAddToWatched={handleAddToWatched}
              onOpenDetails={setSelectedID}
            />
          ) : (
            <>
              <Summary watched={value} />
              <WatchedList watched={value} onDelteMovie={deleteMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
