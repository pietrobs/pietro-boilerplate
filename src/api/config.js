import BASE_URL from './base-url.js'
import axios from 'axios'

export function getFlowtypeConfig () {
  return axios.get(`${BASE_URL}/config`)
}
