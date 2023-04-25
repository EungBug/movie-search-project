import MovieItem from './MovieItem'
import styles from './MovieList.module.scss'

export default function MovieList({ movies = [], totalResults, isLoading }) {
  return (
    <div className={styles.result}>
      {isLoading ? (
        <span
          className="fa-sharp fa-solid fa-spinner fa-spin-pulse"
          style={{
            color: '#4548a5',
            fontSize: '50px',
            left: '-50%',
            marginLeft: '50%'
          }}></span>
      ) : (
        <>
          <p className={styles.total}>{`검색결과 : 총 ${
            totalResults || 0
          }건`}</p>
          {movies.length !== 0 ? (
            <ul>
              {movies.map(movie => {
                return <MovieItem movie={movie} />
              })}
            </ul>
          ) : (
            <div className={styles.message}>🎬 검색 결과가 없습니다.</div>
          )}
        </>
      )}
    </div>
  )
}
