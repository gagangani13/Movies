import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  function deleteMovie(e) {
    const key=e.target.id
    props.deleteMovie(key)
  }
  return (
    <li className={classes.movie} >
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button id={props.id} onClick={deleteMovie}>DELETE</button>
    </li>
  );
};

export default Movie;