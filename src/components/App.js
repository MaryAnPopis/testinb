import React, { Component } from 'react'

import { GlobalStyles } from '../styles/globalStyles'
import Routes from '../Routes'

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyles />
        <Routes />
      </div>
    )
  }
}

export default App
