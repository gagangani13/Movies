import React, { useRef } from 'react'

const MovieForm = (props) => {
    const titleRef=useRef()
    const textRef=useRef()
    const dateRef=useRef()
    function addMovie(e) {
        e.preventDefault();
        const details={title: titleRef.current.value,
            openingText:  textRef.current.value,
            releaseDate:  dateRef.current.value}
        props.addMovie(details)
    }
  return (
    <form onSubmit={addMovie} style={{display:'grid',rowGap:'1rem'}}>
      <label htmlFor='title'>Title</label>
      <input id='title' type='text' ref={titleRef}/>
      <label htmlFor='openingtext'>Opening Text</label>
      <input id='openingtext' type='text' ref={textRef}/>
      <label htmlFor='releasedate'>Release Date</label>
      <input id='releasedate' type='date' ref={dateRef}/>
      <button>Add Movie</button>
    </form>
  )
}

export default MovieForm
