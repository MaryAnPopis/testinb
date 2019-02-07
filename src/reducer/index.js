import {
  INIT_GROUP_PROJECTS,
  INIT_GROUP,
  ADD_PROJECT_STORE,
  ADD_TEST_SUITE_STORE,
  ADD_TESTS_SUITES_PROJECT,
  DELETE_ITEM,
} from '../actions'

import { patch } from '../services'

let initialState = {}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GROUP:
      return Object.assign({}, state, { group: action.group })
    case INIT_GROUP_PROJECTS:
      return Object.assign({}, state, { groupProjects: action.projects })
    case ADD_PROJECT_STORE:
      return Object.assign({}, state, { project: action.project })
    case ADD_TEST_SUITE_STORE:
      return Object.assign({}, state, { testsuite: action.testsuite })
    case ADD_TESTS_SUITES_PROJECT:
      return Object.assign({}, state, { testsuiteslist: action.testsuites })
    case DELETE_ITEM:
      let deleteItem = state.testsuiteslist.find(item => item.id === action.item.id)
      let index = state.testsuiteslist.indexOf(deleteItem)
      let newList = [...state.testsuiteslist]
      newList.splice(index, 1)
      const Item = {
        isActive: false,
      }
      patch(`testSuite/${action.item.id}`, Item)
      return Object.assign({}, state, { testsuiteslist: newList })
    default:
      return state
  }
}

export default Reducer
