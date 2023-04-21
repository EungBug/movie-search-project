import { createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import MyMovies from './MyMovies'

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/my-movies',
    element: <MyMovies />
  }
])
