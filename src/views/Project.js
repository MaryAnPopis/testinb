import React, { Component } from 'react'

import MenuBar from '../components/MenuBar'
import Loader from '../components/Loader'
import { colors } from '../styles/colors'
import { getByParam } from '../services'

export class Project extends Component {
  constructor(props) {
    super(props)
    const projectId = props.match.params.idProject
    this.state = {
      projectId: projectId,
      fetchInProgress: false,
      projectName: '',
      creationDate: '',
    }
  }

  componentDidMount() {
    this.setState({
      fetchInProgress: true,
    })
    getByParam('project', this.state.projectId).then(data => {
      this.setState({
        fetchInProgress: false,
        projectName: data[0].name,
        creationDate: data[0].creation_date,
      })
    })
  }
  render() {
    return (
      <div>
        {this.state.fetchInProgress && <Loader color={colors.black} />}
        <MenuBar />
        <div className="container">
          <h1>Project {this.state.projectName}</h1>
        </div>
      </div>
    )
  }
}

export default Project
