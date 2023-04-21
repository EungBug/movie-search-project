import { useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import styles from './AppHeader.module.scss'

export default function AppHeader() {
  const navigate = useNavigate()
  const homeRef = useRef(null)

  useEffect(() => {
    homeRef.current.addEventListener('click', goToHome)
  }, [])

  function goToHome() {
    navigate('/')
  }

  return (
    <div className={styles.header}>
      <h1 ref={homeRef}>
        Movie.<span>Bug</span>🐞
      </h1>
      <AppNavigation />
    </div>
  )
}

// Nav
function AppNavigation() {
  const navigate = useNavigate()
  function goToMyMovies() {
    navigate('/my-movies')
  }

  return (
    <nav>
      <ul>
        <AppNavMenu
          menuName="My Movies"
          onClick={goToMyMovies}
        />
      </ul>
    </nav>
  )
}

// NavItem
function AppNavMenu({ menuName, onClick }) {
  const menuRef = useRef(null)
  useEffect(() => {
    menuRef.current.addEventListener('click', onClick)
  }, [])

  return (
    <li
      key={menuName}
      ref={menuRef}>
      {menuName}
    </li>
  )
}
