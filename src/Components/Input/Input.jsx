import { useEffect, useRef, useState } from "react";
import { useKey } from "../customHooks/useKey/useKey";

export function Input({ query, setQuery }) {
  const inputRef = useRef();

  useKey("Enter", function () {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    setQuery("");
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
}
