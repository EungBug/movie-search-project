import { useRef, useEffect, useState } from 'react'
import styles from './SearchBar.module.scss'

export default function SearchBar({
  keyword,
  onChange,
  onSearchClick,
  isSearching
}) {
  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        {
          onSearchClick()
        }
        event.target.blur() // 포커스 해제
      }
    })
  }, [])

  return (
    <div
      className={`${styles['search-bar']} ${
        isSearching ? styles.searching : ''
      }`}>
      <input
        type="text"
        value={keyword}
        onChange={e => onChange(e.target.value)}
        placeholder="Search Movie"
        ref={searchRef}
      />
      <button onClick={onSearchClick}>SEARCH</button>
    </div>
  )
}
