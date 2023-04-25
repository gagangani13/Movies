import React from 'react';

import Movie from './Movie';
import classes from './MovieList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          deleteMovie={props.deleteMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
