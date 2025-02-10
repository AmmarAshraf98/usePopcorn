export function Main({ children }) {
  // const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className='main'>
      {/* old box for movie list */}
      {/* <ListBox /> */}
      {/* -------------------------------------------------- */}
      {/* new way */}
      {/* <Box>
        <MovieList />
      </Box> */}

      {/* old box for wathced movies */}
      {/* <WatchedBox /> */}
      {/* -------------------------------------------------- */}
      {/* new way */}
      {/* <Box>
        <Summary watched={watched} />
        <WatchedList watched={watched} />
      </Box> */}

      {children}
    </main>
  );
}
