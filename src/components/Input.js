import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../styles/colors'

const Input = props => {
  return (
    <InputComponent
      className="form-input"
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  )
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default Input

const InputComponent = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.fontGrey};
  letter-spacing: normal;
  padding: 10px 15px;
  border-radius: 4px;
  border: solid 1.5px #d9d9d9;
  outline: transparent;
  &:focus {
    border: solid 1.5px ${colors.black};
  }
`
