import { useState, useEffect, useRef } from 'react'
import { searchByMovie } from '~/MovieApi'
import AppHeader from '~/components/AppHeader'
import SearchBar from '~/components/SearchBar'
import MovieList from '~/components/MovieList'
import MovieItem from '~/components/MovieItem'
import styles from './Home.module.scss'

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getMovies = async () => {
    setIsLoading(true)
    try {
      const res = await searchByMovie(searchKeyword)
      if (res) {
        setMovies(res.Search)
        setTotalResults(res.totalResults)

        // Loading Spinner를 좀 더 보여주기 위해..
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  const changeSearchKeyword = keyword => {
    setSearchKeyword(keyword)
    if (keyword.trim() === '') {
      setIsSearching(false)
    }
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
          <MovieList
            totalResults={totalResults}
            movies={movies}
            isLoading={isLoading}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

function MovieResult({ totalResults, movies, isLoading }) {
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
          <p>{`검색결과 : 총 ${totalResults}건`}</p>
          <ul>
            {movies?.map(movie => {
              console.log(movie)
              return <MovieItem movie={movie} />
            })}
          </ul>
        </>
      )}
    </div>
  )
}
