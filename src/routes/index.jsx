import { createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import MyMovies from './MyMovies'
import Detail from './Detail'

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
  }
])
