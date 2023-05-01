import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { searchByMovie } from '~/api'
import AppHeader from '~/components/AppHeader'
import SearchBar from '~/components/SearchBar'
import MovieList from '~/components/MovieList'
import ErrorPopup from '../components/ErrorPopup'
import styles from './Home.module.scss'

export default function Home() {
  const [year, setYear] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [loadMore, setLoadMore] = useState(false) // 무한 스크롤 로딩중인지
  const [errorMessage, setErrorMessage] = useState('')

  // 무한스크롤
  const obsRef = useRef(null)
  const preventRef = useRef(false)
  const endRef = useRef(false)

  // 네트워크 에러 시 메인으로 이동
  const navigate = useNavigate()

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 })
    if (obsRef.current) {
      console.log('옵저버 생성')
      observer.observe(obsRef.current)
    }

    return () => {
      console.log('옵저버 disconnect')
      observer.disconnect()
    }
  }, [isSearching])

  useEffect(() => {
    // 30개씩 호출 구현
    if (!searchKeyword.trim()) return
    getMovies()
  }, [page])

  const getMovies = async () => {
    if (page % 3 === 1) {
      // 처음 호출 한번만 로딩을 돌리고
      setIsLoading(true)
    }

    const res = await searchByMovie(searchKeyword, page, year, errorHandler)
    console.log(res)
    if (res.Response === 'True') {
      if (res.Search) {
        setMovies([...movies, ...res.Search])
        setTotalResults(res.totalResults)

        const pageMax = Math.ceil(Number(res.totalResults) / 10)
        console.log('api 호출 =====', page)

        // 더이상 호출할 데이터 없음
        if (page === pageMax) {
          endRef.current = true
        }

        //30개씩 조회 완료 시 로딩 종료
        if (page % 3 === 0 || page === pageMax) {
          setIsLoading(false)
          preventRef.current = true
          setLoadMore(false)
          return
        }

        setPage(page + 1)
      }
    } else {
      if (res.Error === 'Too many results.') {
        errorHandler({ code: 'ERR_TOO_MANY' })
      } else {
        setIsLoading(false)
      }
    }
  }

  const errorHandler = error => {
    setIsLoading(false)
    if (error.code === 'ERR_NETWORK') {
      setErrorMessage(
        '🚨 네트워크 오류가 발생했습니다.\n잠시후 다시 시도해주세요!!'
      )
    } else if (error.code === 'ERR_TOO_MANY') {
      setErrorMessage('🤯 검색 결과가 너무 많습니다.\n자세하게 검색해주세요!!')
    } else {
      setErrorMessage(
        '❌ 알 수 없는 오류가 발생했습니다.\n잠시 후 다시 시도해주세요!!'
      )
    }
    setIsError(true)
  }

  function goToHome() {
    navigate('/')
    navigate(0)
  }

  const clearSearching = () => {
    setIsSearching(false)
    setMovies([])
    setIsError(false)
  }

  const changeSearchKeyword = keyword => {
    setSearchKeyword(keyword)
    if (keyword.trim() === '') {
      clearSearching()
    }
  }

  const enterKeydownHandler = event => {
    if (event.key === 'Enter') {
      searchButtonClick()
      event.target.blur()
    }
  }

  const yearSelectedHandler = event => {
    const selectedYear = event.target.value === 'All' ? '' : event.target.value
    setYear(selectedYear)
  }

  const obsHandler = entries => {
    const target = entries[0]
    //옵저버 중복 실행 방지를 위한 Flag들
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      console.log('핸들러 실행')
      preventRef.current = false
      setLoadMore(true)
      setPage(prev => prev + 1) //페이지 값 증가
    }
  }

  const searchButtonClick = () => {
    if (searchKeyword.trim() !== '') {
      preventRef.current = false
      endRef.current = false
      setPage(1)
      setMovies([])
      setIsSearching(true)
      if (page === 1) getMovies()
    }
  }

  return (
    <div className={styles.home}>
      <AppHeader />

      <div className={`${styles.content}`}>
        {isSearching ? '' : <div className={styles.bg}></div>}

        <SearchBar
          keyword={searchKeyword}
          onChange={changeSearchKeyword}
          onSearchClick={searchButtonClick}
          isSearching={isSearching}
          onKeydown={enterKeydownHandler}
          onYearSelected={yearSelectedHandler}
        />

        {isSearching && movies && !isError ? (
          <>
            <MovieList
              totalResults={totalResults}
              movies={movies}
              isLoading={isLoading && page <= 3}
              loadMore={loadMore}
            />
            {/* 하단을 감지할 옵저버 */}
            <div
              className=""
              ref={obsRef}></div>
          </>
        ) : (
          ''
        )}

        {isError && errorMessage ? (
          <ErrorPopup
            message={errorMessage}
            confirmCb={goToHome}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
