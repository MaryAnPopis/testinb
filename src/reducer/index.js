import {
  INIT_GROUP_PROJECTS,
  INIT_GROUP,
  ADD_PROJECT_STORE,
  ADD_TEST_SUITE_STORE,
  ADD_TESTS_SUITES_PROJECT,
  DELETE_TEST_SUITE,
  ADD_TESTS_CASES_STORE,
  DELETE_TEST_CASE,
} from '../actions'

import { patch, deleteItemStore } from '../services'

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
    case ADD_TESTS_CASES_STORE:
      return Object.assign({}, state, { testcaseslist: action.testcases })
    case ADD_TESTS_SUITES_PROJECT:
      return Object.assign({}, state, { testsuiteslist: action.testsuites })
    case DELETE_TEST_SUITE:
      let newList = deleteItemStore(state.testsuiteslist, action.item.id, [...state.testsuiteslist])
      const Item = {
        isActive: false,
      }
      patch(`${action.item.path}/${action.item.id}`, Item)
      return Object.assign({}, state, { testsuiteslist: newList })
    case DELETE_TEST_CASE:
      newList = deleteItemStore(state.testcaseslist, action.item.id, [...state.testcaseslist])
      const testCase = {
        isActive: false,
      }
      patch(`${action.item.path}/${action.item.id}`, testCase)
      return Object.assign({}, state, { testcaseslist: newList })
    default:
      return state
  }
}

export default Reducer
