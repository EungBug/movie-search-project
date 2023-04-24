import axios from 'axios'

const BASE_URL = 'https://omdbapi.com'
const APIKEY = '7035c60c'

export async function searchByMovie(keyword, page) {
  try {
    const res = await axios({
      url: BASE_URL,
      method: 'GET',
      params: {
        apikey: APIKEY,
        s: keyword,
        page: page
      }
    })

    return res.data ?? {}
  } catch (error) {
    // TODO : 에러처리
  }
}
