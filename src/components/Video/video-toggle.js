/* eslint-disable react/prop-types */
import React from 'react'
import propTypes from 'prop-types'

import { VideoContext } from './context'

class VideoToggle extends React.Component {
  defaultToggleProps = {
    visible: true,
    fullScreen: false
  }

  componentDidMount() {
    const { toggleProps, toggleVideo } = this.props
    toggleVideo({ ...this.defaultToggleProps, ...toggleProps })
  }

  componentWillUnmount() {
    this.props.toggleVideo({
      visible: false,
      fullScreen: false
    })
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

VideoToggle.propTypes = {
  toggleProps: propTypes.object,
  toggleVideo: propTypes.func
}

const withVideo = toggleProps => Component => {
  function VideoHOC() {
    return (
      <VideoContext.Consumer>
        {props => (
          <VideoToggle toggleProps={toggleProps} toggleVideo={props.toggle}>
            <Component
              video={props}
            />
          </VideoToggle>
        )}
      </VideoContext.Consumer>
    )
  }

  VideoHOC.propTypes = {
    toggle: propTypes.func
  }

  return VideoHOC
}

export default withVideo;