import { useState, useEffect, useRef } from 'react'
import { searchByMovie } from '~/MovieApi'
import AppHeader from '~/components/AppHeader'
import SearchBar from '~/components/SearchBar'
import styles from './Home.module.scss'

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [movies, setMovies] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const getMovies = async () => {
    try {
      const res = await searchByMovie()
      console.log(res)
      setMovies(res)
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

  const moveSearchbarPosition = () => {}

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
      </div>
    </div>
  )
}
