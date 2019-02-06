import {
  INIT_GROUP_PROJECTS,
  INIT_GROUP,
  ADD_PROJECT_STORE,
  ADD_TEST_SUITE_STORE,
} from '../actions'
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
    default:
      return state
  }
}

export default Reducer
