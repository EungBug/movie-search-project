import { NavLink } from 'react-router-dom'
import { useRef } from 'react'
import styles from './AppHeader.module.scss'
export default function AppHeader() {
  const homeRef = useRef(null)

  return (
    <div className={styles.header}>
      <a href="/">
        <h1 ref={homeRef}>
          Movie.<span>Bug</span>🐞
        </h1>
      </a>
      <AppNavigation />
    </div>
  )
}

// Nav
function AppNavigation({ activeMenu }) {
  return (
    <nav>
      <ul>
        <AppNavMenu
          key={'My Movies'}
          menuName="My Movies"
          link="/my-movies"
        />
        <AppNavMenu
          key={'About'}
          menuName="About"
          link="/about"
        />
      </ul>
    </nav>
  )
}

// NavItem
function AppNavMenu({ menuName, link }) {
  const menuRef = useRef(null)

  return (
    <NavLink
      to={link}
      className={({ isActive }) => (isActive ? `${styles.active}` : '')}>
      <li
        key={menuName}
        ref={menuRef}>
        {menuName}
      </li>
    </NavLink>
  )
}
