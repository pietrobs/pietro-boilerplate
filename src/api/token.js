import axios from 'axios'
import BASE_URL from './base-url.js'

const { Headers, fetch } = window

function getTokenStatus() {
  const url = `${BASE_URL}/token/status`
  const method = 'GET'

  const headers = new Headers()
  headers.append('Content-Type', 'application/json;charset=UTF-8')

  const params = {
    headers,
    method
  }

  return fetch(url, params)
}

function setToken(token) {
  const url = `${BASE_URL}/token`
  const method = 'POST'
  const headers = new Headers()
  const payload = {
    token
  }
  // const json = JSON.stringify(payload)

  headers.append('content-type', 'application/json;')

  return axios.post(url, payload, { headers })
}

export {
  setToken,
  getTokenStatus
}
