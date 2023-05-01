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
      {myMovies.length !== 0 ? (
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
      ) : (
        <p style={{ textAlign: 'center', marginTop: '150px' }}>
          My Movies 목록이 비었습니다.
        </p>
      )}
    </div>
  )
}
