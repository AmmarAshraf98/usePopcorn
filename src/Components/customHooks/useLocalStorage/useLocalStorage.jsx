import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setvalue] = useState(() => {
    const x = JSON.parse(localStorage.getItem(key));
    if (x) return x;
    else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setvalue];
}
