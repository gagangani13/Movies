import React, { useState } from "react";

import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const[movies,setMovies]=useState([])
  async function fetchMovies(){
    const response= await fetch('https://swapi.dev/api/films');
    const data=await response.json();
    const transform=data.results.map((item)=>{
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
        <MovieList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
