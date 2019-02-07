import React from 'react'
import styled from 'styled-components'

import { colors } from '../styles/colors'

const Button = props => {
  return (
    <Style.Button onClick={props.onClick} style={props.style}>
      {props.name}
    </Style.Button>
  )
}

export default Button

const Style = {}

Style.Button = styled.button`
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  background-color: ${colors.aqua};
  color: white;
  outline: none;
  border-radius: 0.3rem;
  width: 100%;
  padding: 0.5rem 1.8rem;
  &:hover {
    background-color: ${colors.mainColorHover};
  }
`
