import axios from 'axios'
import BASE_URL from './base-url'

export function shutdownClient () {
  const URL = `${BASE_URL}/machine/shutdown`

  return axios.post(URL, {})
}
