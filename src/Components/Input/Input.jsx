import { useEffect, useRef, useState } from "react";

export function Input({ query, setQuery }) {
  const inputRef = useRef();

  useEffect(() => {
    // handle to focus once user press Enter button
    function callBack(e) {
      // check if the element is still focus
      if (document.activeElement === inputRef.current) return;

      if (e.key === "Enter") {
        inputRef.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callBack);

    //cleaning
    return () => document.removeEventListener("keydown", callBack);
  }, []);

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
