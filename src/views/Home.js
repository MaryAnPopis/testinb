import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getByParam } from '../services'
import { colors } from '../styles/colors'
import MenuBar from '../components/MenuBar'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      groupId: '',
      projects: [],
    }
  }

  componentDidMount() {
    const groupId = this.state.groupId
    getByParam('project/group', groupId).then(data => {
      this.setState({
        projects: data,
      })
    })
  }

  render() {
    return (
      <div>
        <MenuBar />
        <div className="container">
          <h1>All projects</h1>
          <ProjectWrapper>
            <AddProject>
              <AddLink to="/projects/new">
                <img src="https://app.hiptest.com/assets/on-boarding/icon-plus.svg" alt="" />
              </AddLink>
              <p>Add new project</p>
            </AddProject>
          </ProjectWrapper>
        </div>
      </div>
    )
  }
}

export default Home

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: auto;
`

const AddLink = styled(Link)`
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid ${colors.bg};
  color: ${colors.bg};
  width: 3rem;
  padding: 0.9rem;
`

const AddProject = styled.div`
  height: 100%;
  display: flex;
  border-radius: 2px;
  border: 1px solid #dcdcdb;
  color: ${colors.fontGrey};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f1f0;
  width: 19.25rem;
  height: 400px;
`
