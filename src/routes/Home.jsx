import { useState, useEffect, useRef } from 'react'
import { searchByMovie } from '~/MovieApi'
import AppHeader from '~/components/AppHeader'
import SearchBar from '~/components/SearchBar'
import MovieItem from '~/components/MovieItem'
import styles from './Home.module.scss'

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const getMovies = async () => {
    try {
      const res = await searchByMovie(searchKeyword)
      console.log(res)
      if (res) {
        setMovies(res.Search)
        setTotalResults(res.totalResults)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const changeSearchKeyword = keyword => {
    console.log(keyword)
    setSearchKeyword(keyword)
  }

  const searchButtonClick = () => {
    if (searchKeyword.trim()) {
      setIsSearching(true)
      getMovies()
    }
  }

  return (
    <div className={styles.home}>
      <AppHeader />

      <div className={`${styles.content}`}>
        <SearchBar
          keyword={searchKeyword}
          onChange={changeSearchKeyword}
          onSearchClick={searchButtonClick}
          isSearching={isSearching}
        />

        {isSearching && movies ? (
          <MovieResult
            totalResults={totalResults}
            movies={movies}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

function MovieResult({ totalResults, movies }) {
  return (
    <div className={styles.result}>
      <p>{`검색결과 : 총 ${totalResults}건`}</p>
      <ul>
        {movies?.map(movie => {
          console.log(movie)
          return <MovieItem movie={movie} />
        })}
      </ul>
    </div>
  )
}
