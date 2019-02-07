import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { colors } from '../styles/colors'

const hide = {
  display: 'none',
}

const Add = props => {
  return (
    <AddContainer>
      <AddLink to={props.path}>
        <img src="https://app.hiptest.com/assets/on-boarding/icon-plus.svg" alt="" />
      </AddLink>
      <p style={props.p === '' ? hide : ''}>{props.p}</p>
    </AddContainer>
  )
}

Add.propTypes = {
  path: PropTypes.string,
  p: PropTypes.string,
}

Add.defaultProps = {
  p: '',
}

export default Add

const AddLink = styled(Link)`
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid ${colors.bg};
  color: ${colors.bg};
  width: 2rem;
  padding: 0.5rem;
`

const AddContainer = styled.div`
  display: flex;
  border-radius: 2px;
  border: 1px solid #dcdcdb;
  color: ${colors.fontGrey};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f1f0;
  width: 100%;
  height: auto;
  padding: 0.5rem;
`
