import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './MovieItem.module.scss'

export default function MovieItem({ movie }) {
  const itemRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    itemRef.current.addEventListener('click', goToMovieDetail)
  }, [])

  const goToMovieDetail = () => {
    navigate(`/movies/${movie.imdbID}`)
  }

  const imageErrorHandler = event => {
    event.target.className = styles['no-image']
    event.target.src = '/no_image.png'
  }

  return (
    <li
      key={movie.imdbID}
      ref={itemRef}>
      <div className={styles['movie-item']}>
        <img
          src={movie.Poster}
          alt={movie.Title}
          onError={imageErrorHandler}
        />
        <div className={styles['text-group']}>
          <p className={styles.year}>{movie.Year}</p>
          <p className={styles.title}>{movie.Title}</p>
        </div>
      </div>
    </li>
  )
}
