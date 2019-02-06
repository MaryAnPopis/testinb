import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'

class Login extends Component {
  handleSubmit(e) {
    e.preventDefault()
  }
  render() {
    return (
      <main className="bg-dark height-vh">
        <div className="container">
          <Logo>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="133" viewBox="0 0 373 133">
              <g id="testinb-logo" transform="translate(-172 -60)">
                <text
                  id="testinb"
                  transform="translate(242 168)"
                  fill="#f8f8f8"
                  font-size="100"
                  font-family="SegoeUI, Segoe UI"
                >
                  <tspan x="0" y="0">
                    testin
                  </tspan>
                  <tspan y="0" fill="#e1e1e1">
                    b
                  </tspan>
                </text>
                <g id="ic_bug_report_48px" transform="translate(164 99)">
                  <path
                    id="Path_143"
                    data-name="Path 143"
                    d="M69,24.78H58.287a22.57,22.57,0,0,0-6.92-7.362l6.2-6.1L52.168,6l-8.292,8.169a22.31,22.31,0,0,0-10.751,0L24.832,6l-5.395,5.315,6.2,6.1a22.57,22.57,0,0,0-6.92,7.362H8v7.512h7.968a22.2,22.2,0,0,0-.343,3.756V39.8H8v7.512h7.625v3.756a22.2,22.2,0,0,0,.343,3.756H8V62.34H18.713a23.007,23.007,0,0,0,39.574,0H69V54.828H61.032a22.2,22.2,0,0,0,.343-3.756V47.316H69V39.8H61.375V36.048a22.2,22.2,0,0,0-.343-3.756H69ZM46.125,54.828H30.875V47.316h15.25Zm0-15.024H30.875V32.292h15.25Z"
                    transform="translate(0 0)"
                    fill="#00d6d6"
                  />
                </g>
              </g>
            </svg>
          </Logo>
          <FormWrapper>
            <form className="form" onSubmit={e => this.handleSubmit(e)}>
              <div className="form__header">
                <h2 className="form__title">Sign in</h2>
                <h3 className="form__subtitle">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </h3>
              </div>
              <div className="form-control">
                <Label name="Email" />
                <Input type="text" placeholder="email" />
              </div>
              <div className="form-control">
                <Label name="Password" />
                <Input type="password" placeholder="**********" />
              </div>
              <Button name="Sign in" />
            </form>
          </FormWrapper>
        </div>
      </main>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default Login

const FormWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.div`
  display: flex;
  padding: 2rem 0 1rem 0;
  justify-content: center;
`
