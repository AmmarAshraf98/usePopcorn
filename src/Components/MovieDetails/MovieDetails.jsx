import React, { useEffect, useState } from "react";
import Loadear from "../Loadear/Loadear";
import StarRating from "../StarRating/StarRating";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

export default function MovieDetails({
  movieID,
  onOpenDetails,
  onAddToWatched,
  watched,
}) {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [temp, setTemp] = useState(0);

  function handleClickR(n) {
    setRating(n);
  }

  function handleHoverR(n) {
    setTemp(n);
  }

  function handleCloseDetails() {
    onOpenDetails(null);
  }

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieID);
  const userRating = watched.find(
    (movie) => movie.imdbID === movieID
  )?.userRating;

  // handle Add movie to watched list
  function handleAddMovie() {
    const { Runtime } = selectedMovie;
    onAddToWatched({
      ...selectedMovie,
      userRating: rating,
      Runtime: Number(Runtime.split(" ")[0]),
    });
  }

  // get movie details
  useEffect(() => {
    async function getMovieDetails() {
      setError("");
      setloading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movieID}&apikey=f87a9968`
        );
        if (!res.ok) throw new Error("movie details not found");
        const data = await res.json();
        setSelectedMovie(data);

        const title = data.Title;
        document.title = `movie | ${title}`;
      } catch (error) {
        setError(error.message);
      } finally {
        setloading(false);
      }
    }

    getMovieDetails();

    // use cleaning fun to back title to default
    return () => {
      document.title = `usePopcorn`;
    };
  }, [movieID]);

  // cleaning event
  useEffect(() => {
    const handleKeyupToClose = (e) => {
      if (e.key !== "Escape") return;
      handleCloseDetails();
    };

    // add Escape button to close the movie details
    document.addEventListener("keydown", handleKeyupToClose);

    return () => {
      // clear the event
      document.removeEventListener("keydown", handleKeyupToClose);
    };
  }, []);

  return (
    <>
      {loading && <Loadear />}
      {!loading && !error && (
        <div className='details'>
          <header>
            <button className='btn-back' onClick={() => handleCloseDetails()}>
              &larr;
            </button>
            <img src={selectedMovie?.Poster} alt={selectedMovie} />
            <div className='details-overview'>
              <h2>{selectedMovie?.Title}</h2>
              <p>{selectedMovie?.Actors}</p>
              <p>{selectedMovie?.Genre}</p>
              <p>
                <span>⭐</span>
                {selectedMovie?.Ratings[0].Value}{" "}
                {selectedMovie?.Ratings[0].Source}
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    rating={rating}
                    handleClickR={handleClickR}
                    temp={temp}
                    handleHoverR={handleHoverR}
                  />
                  {rating > 0 && (
                    <button
                      className='btn-add'
                      onClick={() => {
                        onOpenDetails(false);
                        handleAddMovie();
                      }}
                    >
                      Add To Watched{" "}
                    </button>
                  )}
                </>
              ) : (
                <p>
                  you rated with movie
                  {userRating} <span>🌟</span>
                </p>
              )}
            </div>

            <p>
              <em>{selectedMovie?.Plot}</em>
            </p>
            <p>Starring {selectedMovie?.Actors}</p>
            <p>Director by {selectedMovie?.Director}</p>
          </section>
        </div>
      )}

      {error && <ErrorMsg message={error} />}
    </>
  );
}
