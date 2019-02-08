export const INIT_GROUP_PROJECTS = 'INIT_GROUP_PROJECTS'
export const INIT_GROUP = 'INIT_GROUP'
export const ADD_PROJECT_STORE = 'ADD_PROJECT_STORE'
export const ADD_TEST_SUITE_STORE = 'ADD_TEST_SUITE_STORE'
export const ADD_TESTS_SUITES_PROJECT = 'ADD_TESTS_SUITES_PROJECT'
export const DELETE_TEST_CASE = 'DELETE_TEST_CASE'
export const DELETE_TEST_SUITE = 'DELETE_TEST_SUITE'
export const ADD_TESTS_CASES_STORE = 'ADD_TESTS_CASES_STORE'
export const ADD_TESTS_RUNS_TO_STORE = 'ADD_TESTS_RUNS_TO_STORE'
export const USER_LOG_OUT = 'USER_LOG_OUT'
export const INIT_STATE = 'INIT_STATE'
export const RUN = 'RUN'
export const CURRENT_RUN_CASE = 'CURRENT_RUN_CASE'
export const INDEX_CASE = 'INDEX_CASE'

export const current_run_case = testcase => {
  return {
    type: CURRENT_RUN_CASE,
    testcase,
  }
}
export const index_case = indexCase => {
  return {
    type: INDEX_CASE,
    indexCase,
  }
}

export const initialize_group_projects = projects => {
  return {
    type: INIT_GROUP_PROJECTS,
    projects,
  }
}
export const log_out = state => {
  return {
    USER_LOG_OUT: USER_LOG_OUT,
    state,
  }
}
export const init_state = state => {
  return {
    type: INIT_STATE,
    state,
  }
}

export const deleteItem = item => {
  return {
    type: DELETE_TEST_SUITE,
    item,
  }
}
export const deleteTestCase = item => {
  return {
    type: DELETE_TEST_CASE,
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
export const add_test_runs_to_store = testruns => {
  return {
    type: ADD_TESTS_RUNS_TO_STORE,
    testruns,
  }
}
export const add_tests_cases_store = testcases => {
  return {
    type: ADD_TESTS_CASES_STORE,
    testcases,
  }
}
export const add_tests_suites_project = testsuites => {
  return {
    type: ADD_TESTS_SUITES_PROJECT,
    testsuites,
  }
}
