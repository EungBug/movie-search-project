export function saveMyMovie(movie) {
  const myMovies = getMyMovies()
  myMovies.push(movie)
  localStorage.setItem('my-movies', JSON.stringify(myMovies))
}

export function deleteMovie(movieId) {
  const myMovies = getMyMovies()
  const newMyMovies = myMovies.filter(movie => movie.imdbID !== movieId)
  localStorage.setItem('my-movies', JSON.stringify(newMyMovies))
}

export function getMyMovies() {
  const savedData = localStorage.getItem('my-movies')
  return JSON.parse(savedData) ?? []
}

export function isSavedByMovieId(movieId) {
  const myMovies = getMyMovies()
  console.log('MY Movies >>>', myMovies)
  return myMovies.some(movie => movie.imdbID === movieId)
}
