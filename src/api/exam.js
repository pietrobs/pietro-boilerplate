/* eslint-disable camelcase */
import moment from 'moment'
import axios from 'axios'
import BASE_URL from './base-url.js'

import { BillingType } from './consts.js'

const { Headers, fetch } = window

function getExams() {
  const url = `${BASE_URL}/exam`
  const method = 'GET'

  const headers = new Headers()
  headers.append('Content-Type', 'application/json;charset=UTF-8')

  const params = {
    headers: headers,
    method: method
  }

  return fetch(url, params).then(response => response.json())
}

// eslint-disable-next-line camelcase
function saveExam({ id, accessCode, phones, patient_identifier, billing_type }) {
  const url = `${BASE_URL}/exam`
  const method = 'POST'
  const headers = new Headers()
  const payload = {
    access_code: accessCode,
    emails: [],
    id: id,
    patient: '',
    phones: phones,
    scheduled: moment().add(5, 'minute').toISOString(),
    patient_identifier,
    billing_type
  }
  const json = JSON.stringify(payload)

  headers.append('Content-Type', 'application/json;charset=UTF-8')

  const params = {
    body: json,
    headers: headers,
    method: method
  }

  return fetch(url, params)
}

function startExam({ id, accessCode, phones = [], patient_identifier, billing_type = BillingType.UNKNOWN }) {
  const url = `${BASE_URL}/record/start`

  const payload = {
    id,
    patient_identifier,
    billing_type,
    access_code: accessCode,
    phones: phones,
    scheduled: moment().add(5, 'minute').toISOString(),
    emails: [],
    patient: ''
  }

  return axios.post(url, payload)
}

function stopExam() {
  const url = `${BASE_URL}/record/stop`
  const method = 'POST'
  const headers = new Headers()

  headers.append('Content-Type', 'application/json;charset=UTF-8')

  const params = {
    headers: headers,
    method: method
  }

  return fetch(url, params)
}

function disableExam() {
  const url = `${BASE_URL}/record/disable`
  const method = 'POST'
  const headers = new Headers()

  headers.append('Content-Type', 'application/json;charset=UTF-8')

  const params = {
    headers: headers,
    method: method
  }

  return fetch(url, params)
}

function getExamRunning() {
  const url = `${BASE_URL}/record/running`

  return axios.get(url, {})
}

function notifyExam(examId) {
  const url = `${BASE_URL}/exam/${examId}/notify`
  const method = 'POST'
  const headers = new Headers()

  headers.append('Content-Type', 'application/json;charset=UTF-8')

  const params = {
    headers: headers,
    method: method
  }

  return fetch(url, params)
}

export {
  disableExam,
  getExamRunning,
  getExams,
  notifyExam,
  saveExam,
  startExam,
  stopExam
}
