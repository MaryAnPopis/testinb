import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function validateSession() {
  const session = JSON.parse(sessionStorage.getItem('user'))
  let validate = false
  if (session !== null) {
    if (session.isLogged === true) {
      validate = true
    }
  }

  return validate
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        validateSession() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
