import { useState } from 'react'
import './App.css'
import moviesJson from './moviesJson.json'

function App() {
  const [movies, setMovies] = useState(moviesJson)
  const [updating, setUpdating] = useState(false)
  const [creating, setCreating] = useState(false)
  const [movieToUpdate, setMovieToUpdate] = useState(null)

  const handleDelete = (id) => {
    const copyMovies = [...movies]
    const newMovies = copyMovies.filter(movie => movie.id !== id)
    setMovies(newMovies)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const newMovies = [...movies]
    const updatedMovie = newMovies.findIndex(movie => movie.id === movieToUpdate)
    const fields = Object.fromEntries(new window.FormData(event.target))
    if(fields.title === "" || fields.poster === "") {
      setMovieToUpdate(null)
      setUpdating(false)
      return
    }
    newMovies[updatedMovie] = {id: movieToUpdate, ...fields}
    setMovies(newMovies)
    setMovieToUpdate(null)
    setUpdating(false)
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const fields = Object.fromEntries(new window.FormData(event.target))
    if(fields.title === "" || fields.poster === "") {
      setCreating(false)
      return
    }
    const newMovie = {
      ...fields
    }
    const newMovies = [...movies, newMovie]
    setMovies(newMovies)
    setCreating(false)
  }

  


  return (
    <>
      <h1>Peliculas</h1>
      <div className='row'>
        {movies.map((movie, index) => (
          <div key={index} className='col-lg-6 col-xl-4'>
            <div className="movie-container">
              <div className="movie-poster">
                <img src={movie.poster} />
              </div>
              <h4>{movie.title}</h4>
              <div className="movie-action">
                <button 
                  onClick={() => {
                    setUpdating(true)
                    setMovieToUpdate(movie.id)
                  }}>Modificar</button>
                <button onClick={() => {handleDelete(movie.id)}}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setCreating(true)}>Crear</button>      
        
        </div>
      
      {(updating || creating) && (
        <div className='modal'>
          <form onSubmit={updating ? handleUpdate : handleCreate}>
            <input className="form-control" type='text' name='title' placeholder='Nuevo nombre'/>
            <input className="form-control" type='text' name='poster' placeholder='url' />
            <button>{updating ? "Modificar" : "Crear"}</button>
          </form>
        </div>
      )}


    </>
  )
}

export default App;
