import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetailById } from '../MovieApi'
import AppHeader from '~/components/AppHeader'
import styles from './Detail.module.scss'

export default function Detail() {
  const params = useParams()
  const [movie, setMovie] = useState({})

  const getMovieDetail = async () => {
    const movie = await getMovieDetailById(params.id)
    console.log(movie)
    setMovie(movie)
  }

  useEffect(() => {
    getMovieDetail()
  }, [])

  return (
    <div className={styles.detail}>
      <AppHeader />
      <div className={styles.container}>
        <h1 className={styles.title}>{movie.Title}</h1>
        <div className={styles.labels}>
          {`${movie.Released} | ${movie.Country} | ${movie.Runtime}`}
        </div>
        <div className={styles.specs}>
          <div
            style={{
              backgroundImage: `url(${movie.Poster})`
            }}
            className={styles.poster}></div>
          <div className={styles.infos}>
            <div>
              <h4>장르</h4>
              <p>{movie.Genre}</p>
            </div>
            <div>
              <h4>감독</h4>
              <p>{movie.Director}</p>
            </div>
            <div>
              <h4>출연자</h4>
              <p>{movie.Actors}</p>
            </div>
            <div>
              <h4>제작사</h4>
              <p>{movie.Production}</p>
            </div>
            {/* <div className={styles.rating}>{movie.Plot}</div> */}
          </div>
        </div>
        <div className={styles.plot}>
          <h4>줄거리</h4>
          <p>{movie.Plot}</p>
        </div>
      </div>
    </div>
  )
}
