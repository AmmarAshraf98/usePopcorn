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

const apiKey = "f87a9968";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

// ListBox
// function ListBox() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [movies, setMovies] = useState(tempMovieData);

//   return (
//     <div className='box'>
//       <Button onOpen={setIsOpen} isOpen={isOpen} />

//       {isOpen && <MovieList movies={movies} />}
//     </div>
//   );
// }

// watched film
// //watched
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className='box'>
//       <button
//         className='btn-toggle'
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <Summary watched={watched} />
//           <WatchedList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

// One Box For all data

// Main

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const x = JSON.parse(localStorage.getItem("Watched"));
    if (x) return x;
    else return [];
  });

  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const [selectedID, setSelectedID] = useState(null);

  // get data
  async function getMovie({ signal }) {
    try {
      setError("");
      setloading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
        { signal }
      );

      if (!res.ok) throw new Error("something went wrong when fetching movies");

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

  // handle SelectedId
  function handleSelectedMovie(id) {
    setSelectedID((selectedId) => (selectedID === id ? null : id));
  }

  // handle add to watched
  function handleAddToWatched(movie) {
    // add to watched
    // setWatched((movies) => movies.filter((movie) => movie.imdbID === id));
    setWatched((movies) => [...movies, movie]);
  }

  // handle delete movie from watched list
  function deleteMovie(id) {
    setWatched((movie) => movie.filter((m) => m.imdbID !== id));
  }

  useEffect(() => {
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
              watched={watched}
              movieID={selectedID}
              onAddToWatched={handleAddToWatched}
              onOpenDetails={setSelectedID}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList watched={watched} onDelteMovie={deleteMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
