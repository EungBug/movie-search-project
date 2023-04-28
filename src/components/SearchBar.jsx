import { useRef, useEffect, useState } from 'react'
import styles from './SearchBar.module.scss'

export default function SearchBar({
  keyword,
  onChange,
  onKeydown,
  onSearchClick,
  onYearSelected,
  isSearching
}) {
  const searchRef = useRef(null)
  const yearList = ['All']
  const thisYear = new Date().getFullYear()
  for (let year = Number(thisYear); year >= 1980; year--) {
    yearList.push(year)
  }

  return (
    <div
      className={`${styles['search-bar']} ${
        isSearching ? styles.searching : ''
      }`}>
      {isSearching ? (
        ''
      ) : (
        <select
          name="year"
          onChange={onYearSelected}>
          {yearList.map(year => {
            return (
              <option
                value={year}
                key={year}>
                {year}
              </option>
            )
          })}
        </select>
      )}

      <input
        type="text"
        value={keyword}
        onChange={e => onChange(e.target.value)}
        placeholder="Search Movie..."
        onKeyDown={e => onKeydown(e)}
        ref={searchRef}
      />
      <button onClick={onSearchClick}>SEARCH</button>
    </div>
  )
}
