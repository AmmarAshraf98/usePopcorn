import { Movie } from "../Movie/Movie";

export function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
          movieId={movie.imdbID}
        />
      ))}
    </ul>
  );
}
