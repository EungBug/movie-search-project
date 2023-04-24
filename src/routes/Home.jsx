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
  const [page, setPage] = useState(1)
  const [pageMax, setPageMax] = useState(1)
  const [totalResults, setTotalResults] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 30개씩 호출 구현
    getMovies()
  }, [page])

  const getMovies = async () => {
    if (page % 3 === 1) {
      // 처음 호출 한번만 로딩을 돌리고
      setIsLoading(true)
    }

    try {
      const res = await searchByMovie(searchKeyword, page)
      if (res) {
        setMovies([...movies, ...res.Search])
        setTotalResults(res.totalResults)

        const pageMax = Math.ceil(Number(res.totalResults) / 30)
        setPageMax(pageMax)

        //30개씩 조회 완료 시 로딩 종료
        if (page % 3 === 0 || page === pageMax) {
          setIsLoading(false)
          return
        }
        setPage(page + 1)
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
      setMovies([])
    }
  }

  const searchButtonClick = () => {
    if (searchKeyword.trim()) {
      setIsSearching(true)
      setMovies([])
      setPage(1)
      getMovies(1)
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
