import { useState } from 'react'
import './App.css'
import moviesJson from './moviesJson.json'
import { defaultPosterUrl, validateForm } from './logic/logic'

function App() {
  const [movies, setMovies] = useState(moviesJson)
  const [editing, setEditing] = useState(null)
  const [movieToUpdate, setMovieToUpdate] = useState(null)
  

  const handleDelete = (id) => {
    const newMovies = movies.filter(movie => movie.id !== id)
    setMovies(newMovies)
  }
  
  const handleUpdate = (e) => {
    e.preventDefault()
    const newMovies = [...movies]
    const updatedMovie = newMovies.findIndex(movie => movie.id === movieToUpdate.id)
    const fields = Object.fromEntries(new window.FormData(event.target))
    const validatedMovie = validateForm(fields, movieToUpdate)
    newMovies[updatedMovie] = validatedMovie
    setMovies(newMovies)
    setEditing(null)
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new window.FormData(event.target))
    if(fields.title === "") {
      setEditing(null)
      return
    }
    setMovies([...movies, { id: crypto.randomUUID(), ...fields}])
    setEditing(null)
  }

  const handlePosterError = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, poster: defaultPosterUrl } : movie
   ))}

  return (
    <>
      <h1>Peliculas</h1>
      <div className='movies'>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-container">
            <div className="movie-poster">
              <img src={movie.poster} alt={`${movie.title} poster`} onError={() => handlePosterError(movie.id)}/>
            </div>
            <div className="movie-action">
              <div className='movie-details'>
                <h4>{movie.title}</h4>
                <p>{movie.director}</p>
                <p>{movie.year}</p>
              </div>
              <button className='btn btn-primary'
                onClick={() => {
                  setEditing(true)
                  setMovieToUpdate(movie)
                }}>Modificar</button>
              <button className='btn btn-danger'
                onClick={() => {handleDelete(movie.id)}}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}             
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setEditing(false)}>Crear</button>  
        </div> 
      
      {editing !== null && (
        <div className='modal'>
          <form onSubmit={editing === true ? handleUpdate : handleCreate}>
            <input className="form-control" type='text' name='title' placeholder={editing === true ? movieToUpdate.title : "Nombre"} required={editing===false}/>
            <input className="form-control" type='text' name='director' placeholder={editing === true ? movieToUpdate.director : "Director"} />
            <input className="form-control" type='text' name='year' placeholder={editing === true ? movieToUpdate.year : "Año"} />
            <input className="form-control" type='text' name='poster' placeholder="Imagen URL" />
            <button className='btn btn-primary' type='submit'>{editing === true ? "Modificar" : "Crear"}</button>
            <button className='btn btn-danger' onClick={(e) => {e.preventDefault()
               setEditing(null) }}>Cancelar</button>
          </form>
        </div>
      )}
    </>
  )
}

export default App;
