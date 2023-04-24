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
  const [totalResults, setTotalResults] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 무한스크롤
  const obsRef = useRef(null)
  const preventRef = useRef(false)
  const endRef = useRef(false)

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
    getMovies()
  }, [page])

  const getMovies = async () => {
    if (page % 3 === 1) {
      // 처음 호출 한번만 로딩을 돌리고
      setIsLoading(true)
    }

    try {
      const res = await searchByMovie(searchKeyword, page)
      if (res.Search) {
        setMovies([...movies, ...res.Search])
        setTotalResults(res.totalResults)

        const pageMax = Math.ceil(Number(res.totalResults) / 30)
        console.log('api 호출 =====', page)

        // 더이상 호출할 데이터 없음
        if (page === pageMax) {
          endRef.current = true
        }

        //30개씩 조회 완료 시 로딩 종료
        if (page % 3 === 0 || page === pageMax) {
          setIsLoading(false)
          preventRef.current = true
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

  const obsHandler = entries => {
    const target = entries[0]
    //옵저버 중복 실행 방지를 위한 Flag들
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      console.log('핸들러 실행')
      preventRef.current = false
      setPage(prev => prev + 1) //페이지 값 증가
    }
  }

  const searchButtonClick = () => {
    if (searchKeyword.trim()) {
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
        <SearchBar
          keyword={searchKeyword}
          onChange={changeSearchKeyword}
          onSearchClick={searchButtonClick}
          isSearching={isSearching}
        />

        {isSearching && movies ? (
          <>
            <MovieList
              totalResults={totalResults}
              movies={movies}
              isLoading={isLoading && page <= 3}
            />
            {/* 하단을 감지할 옵저버 */}
            <div
              className=""
              ref={obsRef}></div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
