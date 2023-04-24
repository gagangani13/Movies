import React, { useState } from "react";

import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const[movies,setMovies]=useState([])
  const[loading,setLoading]=useState(false)
  async function fetchMovies(){
    setLoading(true)
    const response= await fetch('https://swapi.dev/api/films');
    const data=await response.json();
    const transform=data.results.map((item)=>{
      setLoading(false)
      return{
        id:item.episode_id,
        title:item.title,
        openingText:item.opening_crawl,
        releaseDate:item.release_date
      }
    })
    setMovies(transform)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!loading&&<MovieList movies={movies} />}
        {loading&&<p>LOADING...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
