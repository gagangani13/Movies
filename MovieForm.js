import React, { useRef } from "react";
import classes from "./MovieForm.module.css";
const MovieForm = (props) => {
  const titleRef = useRef();
  const textRef = useRef();
  const dateRef = useRef();
  function addMovie(e) {
    e.preventDefault();
    const details = {
      title: titleRef.current.value,
      openingText: textRef.current.value,
      releaseDate: dateRef.current.value,
    };
    props.addMovie(details);
  }
  return (
    <form onSubmit={addMovie}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="openingtext">Opening Text</label>
       <textarea rows='5' id='openingtext' ref={textRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="releasedate">Release Date</label>
        <input id="releasedate" type="date" ref={dateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default MovieForm;
