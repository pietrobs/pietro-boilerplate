import axios from 'axios'
import BASE_URL from './base-url.js'

function getDeviceStatus() {
  const URL = `${BASE_URL}/device/status`
  return axios.get(URL)
}

export {
  getDeviceStatus
}
