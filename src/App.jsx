import { useState, useEffect } from 'react'
import { searchByMovie } from '~/MovieApi'
import '~/App.css'

export default function App() {
  const [movies, setMovies] = useState([])
  const getMovies = async () => {
    try {
      const res = await searchByMovie()
      setMovies(res)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <>
      <Header />
      <ul>
        {movies?.map(movie => (
          <li key={movie.imdbID}>{movie.Title}</li>
        ))}
      </ul>
    </>
  )
}
