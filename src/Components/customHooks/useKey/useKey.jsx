import { useEffect } from "react";

export function useKey(key, action) {
  // fire event
  useEffect(() => {
    const handleKeyupToClose = (e) => {
      if (e.key !== key) return;
      action();
    };

    // add Escape button to close the movie details
    document.addEventListener("keydown", handleKeyupToClose);

    return () => {
      // clear the event
      document.removeEventListener("keydown", handleKeyupToClose);
    };
  }, [action, key]);
}
