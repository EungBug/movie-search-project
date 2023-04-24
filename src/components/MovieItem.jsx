import { useRef, useEffect } from 'react'
import styles from './MovieItem.module.scss'

export default function MovieItem({ movie }) {
  const imageErrorHandler = event => {
    event.target.className = styles['no-image']
    event.target.src = '/no_image.png'
  }
  return (
    <li key={movie.imdbID}>
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
