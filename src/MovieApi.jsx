import axios from 'axios'

const BASE_URL = 'https://omdbapi.com'
const APIKEY = '7035c60c'

export async function searchByMovie() {
  const res = await axios({
    url: BASE_URL,
    method: 'GET',
    params: {
      apikey: APIKEY,
      s: 'frozen'
    }
  })

  return res.data.Search ?? []
}
