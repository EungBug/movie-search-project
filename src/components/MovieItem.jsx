import { useRef, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import styles from './MovieItem.module.scss'

export default function MovieItem({ movie }) {
  const itemRef = useRef(null)
  const navigate = useNavigate()

  const goToMovieDetail = () => {
    navigate(`/movies/${movie.imdbID}`)
  }

  const imageErrorHandler = event => {
    event.target.className = styles['no-image']
    event.target.src = '/no_image.png'
  }

  return (
    <li
      ref={itemRef}
      className={styles.container}>
      <NavLink to={`/movies/${movie.imdbID}`}>
        <div className={styles['movie-item']}>
          {/* <img
            src={movie.Poster}
            alt={movie.Title}
            onError={imageErrorHandler}
          /> */}
          <div
            className={
              movie.Poster !== 'N/A'
                ? styles.poster
                : `${styles['poster']} ${styles['no-image']}`
            }
            style={
              movie.Poster !== 'N/A'
                ? { backgroundImage: `url(${movie.Poster})` }
                : { backgroundImage: `url(/public/no_image.png)` }
            }></div>
          <div className={styles['text-group']}>
            <p className={styles.year}>{movie.Year}</p>
            <p className={styles.title}>{movie.Title}</p>
          </div>
        </div>
      </NavLink>
    </li>
  )
}
