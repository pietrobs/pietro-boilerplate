import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { PriorityHigh } from '@material-ui/icons'
import propTypes from 'prop-types'

const StyledErrorMessage = styled.div`
  background: white;
  display: flex;;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  >.message{
    text-align: center;
  }

  > .icon-container {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f44336;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;

    >.icon {
      fill: white;
      width: 16px;
      height: 16px;
    }
  }
`

export const VideoError = () => (
  <StyledErrorMessage>
    <div className='icon-container'>
      <PriorityHigh className='icon' />
    </div>
    <Typography variant='headline' className='message'>
      Por favor, verifique se a placa de captura está configurada corretamente
    </Typography>
  </StyledErrorMessage>
)

