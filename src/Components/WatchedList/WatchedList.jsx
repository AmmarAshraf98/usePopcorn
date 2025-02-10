import { WatchedFilm } from "../WatchedFilm/WatchedFilm";

export function WatchedList({ watched, onDelteMovie }) {
  return (
    <ul className='list'>
      {watched.map((movie, index) => (
        <WatchedFilm movie={movie} key={index} onDelteMovie={onDelteMovie} />
      ))}
    </ul>
  );
}
