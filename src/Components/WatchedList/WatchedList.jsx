import { useEffect } from "react";
import { WatchedFilm } from "../WatchedFilm/WatchedFilm";

export function WatchedList({ watched, onDelteMovie }) {
  useEffect(() => {
    localStorage.setItem("Watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <ul className='list'>
      {watched.map((movie, index) => (
        <WatchedFilm movie={movie} key={index} onDelteMovie={onDelteMovie} />
      ))}
    </ul>
  );
}
