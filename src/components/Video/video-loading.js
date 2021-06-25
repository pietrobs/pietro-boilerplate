import React from 'react'
import styled from 'styled-components'
import { CircularProgress, Typography } from '@material-ui/core'
import propTypes from 'prop-types'

const StyledLoadingVideo = styled.div`
  display: flex;
  background: black;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  width: 100%;
  
    > .spinner {
        color: white;
    }

    > .message {
        font-weight: 500;
        margin-top: 14px;
        color: white;
        text-align: center;
    }
`

export const VideoLoading = () => (
  <StyledLoadingVideo>
    <CircularProgress className='spinner' size={14} />
    <p className="message">
      Buscando vídeo
    </p>
  </StyledLoadingVideo>
)
