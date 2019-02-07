import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { log_out } from '../actions'
import { colors } from '../styles/colors'

const hide = {
  display: 'none',
}

class MenuBar extends React.Component {
  logOut() {
    sessionStorage.setItem('user', JSON.stringify({ isLogged: false }))
    localStorage.clear()
    this.props.log_out({ testsuiteslist: [], testcaseslist: [] })
  }
  render() {
    return (
      <NavBar>
        <Container className="container">
          <Logo>
            <ImgLogo
              xmlns="http://www.w3.org/2000/svg"
              width="373"
              height="133"
              viewBox="0 0 373 133"
            >
              <g id="testinb-logo" transform="translate(-172 -60)">
                <text
                  id="testinb"
                  transform="translate(242 168)"
                  fill="#f8f8f8"
                  fontSize="100"
                  fontFamily="SegoeUI, Segoe UI"
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
            </ImgLogo>
          </Logo>
          <div>
            <LinkNav to="/home">All Projecs</LinkNav>
            <span style={this.props.hidden && hide}>
              <LinkNav to="/project/testsuites">Test Suites</LinkNav>
            </span>
            <span style={this.props.hidden && hide}>
              <LinkNav to="/home">Test Runs</LinkNav>
            </span>
            <LinkNav to="/" onClick={this.logOut}>
              <strong>Log out</strong>
            </LinkNav>
          </div>
        </Container>
      </NavBar>
    )
  }
}
const mapStateToProps = state => {
  return {
    state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: stateClean => dispatch(log_out(stateClean)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar)

const NavBar = styled.nav`
  background-color: ${colors.dark};
  padding: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  width: 7rem;
  height: auto;
`

const ImgLogo = styled.svg`
  width: 100%;
  height: auto;
`

const LinkNav = styled(NavLink)`
  display: inline;
  color: ${colors.bg};
  margin-left: 1rem;
  &::hover {
    color: ${colors.aqua};
  }
`
