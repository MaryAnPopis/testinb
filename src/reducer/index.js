import { INIT_GROUP_PROJECTS, INIT_GROUP } from '../actions'
let initialState = {}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GROUP:
      return Object.assign({}, state, { group: action.group })
    case INIT_GROUP_PROJECTS:
      return Object.assign({}, state, { groupProjects: action.projects })
    default:
      return state
  }
}

export default Reducer
