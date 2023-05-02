import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './MovieItem.module.scss'
import noImage from '/no_image.png'

export default function MovieItem({ movie }) {
  const itemRef = useRef(null)

  return (
    <li
      ref={itemRef}
      className={styles.container}>
      <NavLink to={`/movies/${movie.imdbID}`}>
        <div className={styles['movie-item']}>
          <div
            className={
              movie.Poster !== 'N/A'
                ? styles.poster
                : `${styles['poster']} ${styles['no-image']}`
            }
            style={
              movie.Poster !== 'N/A'
                ? { backgroundImage: `url(${movie.Poster})` }
                : { backgroundImage: `url(${noImage})` }
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
