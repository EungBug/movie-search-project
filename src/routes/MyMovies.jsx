import { useState, useEffect } from 'react'
import AppHeader from '~/components/AppHeader'
import { getMyMovies } from '../storage'
import MovieItem from '../components/MovieItem'

export default function MyMovies() {
  const [myMovies, setMyMovies] = useState([])

  useEffect(() => {
    setMyMovies(getMyMovies())
  }, [])

  return (
    <div className="my-movies">
      <AppHeader />
      <ul className="movie-list">
        {myMovies?.map((movie, index) => {
          return (
            <MovieItem
              key={index}
              movie={movie}
            />
          )
        })}
      </ul>
    </div>
  )
}
