import React from 'react'
import styled from 'styled-components'

import { colors } from '../styles/colors'

const Textarea = props => {
  return (
    <TextArea
      rows={props.rows}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      fontSize={props.fontSize}
      fontColor={props.fontColor}
      disabled={!props.isDisabled}
      borderState={props.borderState}
    />
  )
}

Textarea.defaultProps = {
  fontSize: {
    size: '1rem',
  },
  fontColor: {
    color: colors.fontGrey,
  },
  isDisabled: false, // true make the textarea not disabled
  borderState: {
    border: 'solid 1.5px #d9d9d9',
  },
}

export default Textarea

const TextArea = styled.textarea`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: ${props => props.fontSize.size};
  line-height: 20px;
  color: ${props => props.fontColor.color};
  letter-spacing: normal;
  padding: 10px 15px;
  border-radius: 4px;
  border: ${props => props.borderState.border};
  outline: transparent;
  &:focus {
    border: solid 1.5px ${colors.black};
  }
`
