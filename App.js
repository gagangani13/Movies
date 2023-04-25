import React, { useEffect, useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchMovies();
  }, []);
  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       fetchMovies();
  //     }, 5000);
  //   }
  //   return () => {
  //     clearTimeout();
  //   };
  // }, [error]);

  async function fetchMovies() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://movies-project-7de82-default-rtdb.firebaseio.com/movies.json"
      ); //.json is added to url
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const loadedMovies=[]
      for(const key in data){
        console.log(key)
        loadedMovies.push({
          
          id:key,
          title:data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
        console.log(loadedMovies)
        setLoading(false);
      }
      setMovies(loadedMovies);
    } 
    catch (err) {
      setError(true);
    }
  }
  function cancelOperation() {
    setError(false);
    setLoading(false);
  }
  async function addMovie(details) {
    try {
      const response=await fetch("https://movies-project-7de82-default-rtdb.firebaseio.com/movies.json",{
        method:'POST',
        body:JSON.stringify(details),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(!response.ok){
        throw new Error('ERROR')
      }
      const data= await response.json()
      console.log(data);
      fetchMovies()   
    } catch (err) {
      setError(true)
      setLoading(true)
    }
  }
   async function deleteMovie(ID) {
    try{
      const response=await fetch(`https://movies-project-7de82-default-rtdb.firebaseio.com/movies/${ID}.json`,{
        method:'DELETE'
      })
      console.log(response.json())
      fetchMovies()
    }
    catch(err){
      setError(true)
    }
  }
  let content='LOADING...';
  if(movies.length===0){
    content='No movies added'
  }
  return (
    <React.Fragment>
      <section>
        <MovieForm addMovie={addMovie} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {console.log(movies)}
        {!loading && <MovieList movies={movies} deleteMovie={deleteMovie}/>}
        {loading && !error && <p>{content}</p>}
        {loading && error && (
          <>
            <p>Something went wrong</p>
            <button onClick={cancelOperation}>Close</button>
          </>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
