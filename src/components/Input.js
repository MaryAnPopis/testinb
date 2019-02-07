import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../styles/colors'

class Input extends React.Component {
  constructor() {
    super()

    this.state = {
      disabled: '',
    }
  }
  render() {
    const props = this.props
    return (
      <InputComponent
        className="form-input"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        textAlign={props.textAlign}
        fontSize={props.fontSize}
        fontColor={props.fontColor}
        disabled={!props.isDisabled}
        borderState={props.borderState}
      />
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  textAlign: {
    direction: 'left',
  },
  fontSize: {
    size: '1rem',
  },
  fontColor: {
    color: colors.fontGrey,
  },
  isDisabled: true, // true make the input not disabled
  borderState: {
    border: 'solid 1.5px #d9d9d9',
  },
}

export default Input

const InputComponent = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: ${props => props.fontSize.size};
  line-height: 20px;
  color: ${props => props.fontColor.color};
  letter-spacing: normal;
  padding: 10px 15px;
  border-radius: 4px;
  border:${props => props.borderState.border};
  outline: transparent;
  width: 100%;
  text-align:${props => props.textAlign.direction}
  &:focus {
    border: solid 1.5px ${colors.black};
  }
`
