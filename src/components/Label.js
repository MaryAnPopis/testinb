import React from 'react'
import styled from 'styled-components'

import { colors } from '../styles/colors'

function Label(props) {
  return <Style.Label>{props.name}</Style.Label>
}

export default Label

const Style = {}

Style.Label = styled.label`
  font-weight: 400;
  line-height: 20px;
  color: ${colors.fontGrey};
  letter-spacing: normal;
  margin-bottom: 15px;
`
