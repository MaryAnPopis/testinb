export const INIT_GROUP_PROJECTS = 'INIT_GROUP_PROJECTS'
export const INIT_GROUP = 'INIT_GROUP'
export const ADD_PROJECT_STORE = 'ADD_PROJECT_STORE'
export const ADD_TEST_SUITE_STORE = 'ADD_TEST_SUITE_STORE'
export const ADD_TESTS_SUITES_PROJECT = 'ADD_TESTS_SUITES_PROJECT'
export const DELETE_ITEM = 'DELETE_ITEM'

export const initialize_group_projects = projects => {
  return {
    type: INIT_GROUP_PROJECTS,
    projects,
  }
}

export const deleteItem = item => {
  return {
    type: DELETE_ITEM,
    item,
  }
}

export const initialize_group = group => {
  return {
    type: INIT_GROUP,
    group,
  }
}

export const add_project_store = project => {
  return {
    type: ADD_PROJECT_STORE,
    project,
  }
}
export const add_test_suite_store = testsuite => {
  return {
    type: ADD_TEST_SUITE_STORE,
    testsuite,
  }
}
export const add_tests_suites_project = testsuites => {
  return {
    type: ADD_TESTS_SUITES_PROJECT,
    testsuites,
  }
}
