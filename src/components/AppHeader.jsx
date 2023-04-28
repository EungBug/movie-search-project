import { useNavigate, useLocation } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import styles from './AppHeader.module.scss'
export default function AppHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const homeRef = useRef(null)
  const [activeMenu, setActiveMenu] = useState('')

  useEffect(() => {
    homeRef.current.addEventListener('click', goToHome)
    if (location.pathname === '/') {
      setActiveMenu('Home')
    } else if (location.pathname === '/my-movies') {
      setActiveMenu('MyMovies')
    } else if (location.pathname === '/about') {
      setActiveMenu('About')
    }
  }, [])

  function goToHome() {
    // 메인 > 새로고침
    navigate('/')
    navigate(0)
  }

  return (
    <div className={styles.header}>
      <h1 ref={homeRef}>
        Movie.<span>Bug</span>🐞
      </h1>
      <AppNavigation activeMenu={activeMenu} />
    </div>
  )
}

// Nav
function AppNavigation({ activeMenu }) {
  const navigate = useNavigate()
  function goToMyMovies() {
    navigate('/my-movies')
  }

  function goToAbout() {
    navigate('/about')
  }

  return (
    <nav>
      <ul>
        <AppNavMenu
          key={'My Movies'}
          isActive={activeMenu === 'MyMovies'}
          menuName="My Movies"
          onClick={goToMyMovies}
        />
        <AppNavMenu
          key={'About'}
          isActive={activeMenu === 'About'}
          menuName="About"
          onClick={goToAbout}
        />
      </ul>
    </nav>
  )
}

// NavItem
function AppNavMenu({ isActive, menuName, onClick }) {
  const menuRef = useRef(null)
  useEffect(() => {
    if (isActive) return
    menuRef.current.addEventListener('click', onClick)
  }, [])

  return (
    <li
      key={menuName}
      ref={menuRef}
      className={isActive ? `${styles.active}` : ''}>
      {menuName}
    </li>
  )
}
