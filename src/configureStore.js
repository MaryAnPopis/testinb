import { createStore } from 'redux'
import reducer from './reducer'
import throttle from 'lodash/throttle'

import { saveState, loadState } from './services'

const configureStore = () => {
  const persistedState = loadState()

  let store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  store.subscribe(
    throttle(() => {
      saveState(store.getState())
    }),
    1000
  )

  return store
}

export default configureStore
