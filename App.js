import React, { useEffect, useState } from "react";

import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(()=>{
    console.log("use effect called");
    fetchMovies()
  },[])
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        fetchMovies()
      }, 5000);
    }
    return(()=>{clearTimeout()})
  }, [error]);

  async function fetchMovies() {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const transform = data.results.map((item) => {
        setLoading(false);
        return {
          id: item.episode_id,
          title: item.title,
          openingText: item.opening_crawl,
          releaseDate: item.release_date,
        };
      });
      setMovies(transform);
    } catch (err) {
        setError(true)
      
    }
  }
  function cancelOperation() {
    setError(false);
    setLoading(false);
  }

  return (
    <React.Fragment>
      {console.log('rendering')}
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MovieList movies={movies} />}
        {loading && !error&& <p>LOADING...</p>}
        {loading && error&& (
          <>
            <p>Something went wrong...Retrying</p>
            <button onClick={cancelOperation}>Cancel</button>
          </>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
