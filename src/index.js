import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import 'react-toastify/dist/ReactToastify.css'
import App from './components/App'

const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
