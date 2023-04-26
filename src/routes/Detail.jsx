import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetailById } from '../MovieApi'
import { saveMyMovie, deleteMovie, isSavedByMovieId } from '../Storage'
import AppHeader from '~/components/AppHeader'
import styles from './Detail.module.scss'

export default function Detail() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [movie, setMovie] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getMovieDetail()
    const saved = isSavedByMovieId(params.id)
    setSaved(saved)
  }, [])

  const getMovieDetail = async () => {
    setIsLoading(true)
    const movie = await getMovieDetailById(params.id)
    console.log(movie)
    setMovie(movie)
    setIsLoading(false)
  }

  const onMyMoviesChecked = () => {
    if (saved) {
      deleteMovie(params.id)
    } else {
      saveMyMovie(movie)
    }
    setSaved(!saved)
  }

  return (
    <div className={styles.detail}>
      <AppHeader />
      <div className={styles.container}>
        <input
          type="checkbox"
          checked={saved}
          onClick={onMyMoviesChecked}
          id="my-movies"
        />
        <label for="my-movies"></label>
        <h1
          className={
            isLoading ? `${styles.title} ${styles.skeleton}` : styles.title
          }>
          {movie.Title}
        </h1>
        <div
          className={
            isLoading
              ? `${styles.released} ${styles.skeleton} ${styles.sub}`
              : styles.released
          }>
          {movie.Released}
        </div>
        <div className={styles.specs}>
          {isLoading ? (
            <div className={`${styles.skeleton}`}></div>
          ) : (
            <div
              style={{ backgroundImage: `url(${movie.Poster})` }}
              className={styles.poster}></div>
          )}

          <div className={styles.infos}>
            <div>
              <h4>런타임</h4>
              <p className={isLoading ? styles['skeleton-description'] : ''}>
                {movie.Runtime}
              </p>
            </div>
            <div>
              <h4>국가</h4>
              <p className={isLoading ? styles['skeleton-description'] : ''}>
                {movie.Country}
              </p>
            </div>
            <div>
              <h4>장르</h4>
              <p className={isLoading ? styles['skeleton-description'] : ''}>
                {movie.Genre}
              </p>
            </div>
            <div>
              <h4>감독</h4>
              <p className={isLoading ? styles['skeleton-description'] : ''}>
                {movie.Director}
              </p>
            </div>
            <div>
              <h4>출연자</h4>
              <p className={isLoading ? styles['skeleton-description'] : ''}>
                {movie.Actors}
              </p>
            </div>
            <div>
              <h4>제작사</h4>
              <p className={isLoading ? styles['skeleton-description'] : ''}>
                {movie.Production}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.plot}>
          <h4>줄거리</h4>
          <p
            className={
              isLoading ? `${styles.plottext} ${styles.skeleton}` : ''
            }>
            {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  )
}
