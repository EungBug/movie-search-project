import { createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import MyMovies from './MyMovies'
import Detail from './Detail'
import About from './About'

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/movies/:id',
    element: <Detail />
  },
  {
    path: '/my-movies',
    element: <MyMovies />
  },
  {
    path: '/about',
    element: <About />
  }
])
