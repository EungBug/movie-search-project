import styles from './MovieItem.module.scss'

export default function MovieItem({ movie }) {
  console.log('movie : ', movie)
  return (
    <li key={movie.imdbID}>
      <div className={styles['movie-item']}>
        <img
          src={movie.Poster}
          alt={movie.Title}
        />
        <div className={styles['text-group']}>
          <p className={styles.year}>{movie.Year}</p>
          <p className={styles.title}>{movie.Title}</p>
        </div>
      </div>
    </li>
  )
}
