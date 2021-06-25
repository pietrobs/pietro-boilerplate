/* eslint react/prop-types: 0 */

import { getDeviceStatus } from 'api/device'
import React from 'react'
import { VIDEO_STATUS } from './constants'


export const VideoContext = React.createContext()

export class VideoProvider extends React.Component {
  retryConnection = false

  constructor() {
    super();
    this.state = {
      status: '',
      m3u8: '',
      visible: false,
      fullScreen: false
    }
  }

  componentDidMount() {
    this.connectDevice()
  }

  toggle = props => { this.setState(props) }

  setStatus = status =>
    this.setState({ status })

  retryDeviceConnection = () => {
    this.setState({ status: VIDEO_STATUS.LOADING })

    const retry = () => {
      if (this.retryConnection) {
        console.info('[VideoContext] Trying reconnect device')
        this.retryConnection = false
        this.retryConnectDevice()
      }
    }

    this.deviceConnectionInterval = setInterval(retry, 7 * 1000)
  }

  async retryConnectDevice() {
    try {
      const response = await getDeviceStatus()
      const { status, data } = response

      if (status === 200 && data.online && data.m3u8) {
        console.info('Reconnected')
        clearInterval(this.deviceConnectionInterval)
        this.setState({ m3u8: data.m3u8, status: VIDEO_STATUS.PLAYING })
        return
      }

      this.retryConnection = true
    } catch (error) {
      console.trace(error)
    }
  }

  processDeviceError(response) {
    if (response) {
      console.log('error', response)
      this.setState({ status: VIDEO_STATUS.LOADING })
    }
  }

  processDeviceResponse(response) {
    const { status, data } = response

    if (status === 200 && data.online) {
      this.setState({ m3u8: data.m3u8, status: VIDEO_STATUS.PLAYING })
    } else {
      this.retryConnection = true
      this.setState({ status: VIDEO_STATUS.LOADING })
      this.retryDeviceConnection()
    }
  }

  async connectDevice() {
    this.setState({ status: VIDEO_STATUS.LOADING });

    try {
      const fakeResponse = {
        status: 200,
        data: {
          m3u8: "http://frp.vlab.live:28609/main.m3u8",
          online: true,
        }
      }
      // const response = await getDeviceStatus()
      const response = fakeResponse;
      this.processDeviceResponse(response)
    } catch (error) {
      this.processDeviceError(error.response)
    }
  }

  render() {
    const { children } = this.props

    const {
      status,
      m3u8,
      visible,
      fullScreen
    } = this.state

    return (
      <VideoContext.Provider
        value={{
          status,
          m3u8,
          visible,
          fullScreen,
          toggle: this.toggle,
          setStatus: this.setStatus,
          retryDeviceConnection: this.retryDeviceConnection
        }}
      >
        {children}
      </VideoContext.Provider>
    )
  }
}
