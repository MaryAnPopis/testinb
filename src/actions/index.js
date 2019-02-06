export const INIT_GROUP_PROJECTS = 'INIT_GROUP_PROJECTS'
export const INIT_GROUP = 'INIT_GROUP'

export const initialize_group_projects = projects => {
  return {
    type: INIT_GROUP_PROJECTS,
    projects,
  }
}

export const initialize_group = group => {
  return {
    type: INIT_GROUP,
    group,
  }
}
