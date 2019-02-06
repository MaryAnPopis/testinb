import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { ADD_PROJECT_STORE } from '../actions'
import { getByParam } from '../services'
import { colors } from '../styles/colors'
import MenuBar from '../components/MenuBar'
import ProjectCard from '../components/ProjectCard'
import Loader from '../components/Loader'

class Home extends React.Component {
  constructor(props) {
    super(props)
    const groupId = this.props.state.group.idGroup
    this.state = {
      groupId: groupId,
      projects: [],
      groupDetails: [],
      fetchInProgress: false,
    }
  }

  componentDidMount() {
    const groupId = this.state.groupId
    this.setState({
      fetchInProgress: true,
    })
    getByParam('group', groupId)
      .then(data => {
        this.setState({
          groupDetails: data[0],
        })
        getByParam('project/group', groupId).then(data => {
          this.setState({
            projects: data,
            fetchInProgress: false,
          })
        })
      })
      .catch(err => {
        throw err
      })
  }

  render() {
    return (
      <div>
        {this.state.fetchInProgress && <Loader color={colors.black} />}
        <MenuBar hidden />
        <div className="container">
          <Header>
            <Logo>
              <LogImg src={this.state.groupDetails.logo} alt="group logo" />
            </Logo>
            <h1>{this.state.groupDetails.name}</h1>
          </Header>
          <h2 className="margin-0">All projects</h2>
          <ProjectWrapper>
            <AddProject>
              <AddLink to="/projects/new">
                <img
                  src="https://app.hiptest.com/assets/on-boarding/icon-plus.svg"
                  alt="plus sign"
                />
              </AddLink>
              <p>Add new project</p>
            </AddProject>
            {this.state.projects.map(project => {
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.name}
                  date={project.creation_date}
                  onProjectClick={() =>
                    this.props.onProjectClick({
                      id: project.id,
                      title: project.name,
                      date: project.creation_date,
                    })
                  }
                />
              )
            })}
          </ProjectWrapper>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProjectClick: project => {
      dispatch({ type: ADD_PROJECT_STORE, project })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  flex-basis: auto;
  padding: 5px; /* this */
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
  display: flex;
  border-radius: 2px;
  border: 1px solid #dcdcdb;
  color: ${colors.fontGrey};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f1f0;
  width: 17rem;
  height: 23rem;
  margin: 5px; /* and that, will result in a 10px gap */
`
const Logo = styled.div`
  width: 3rem;
  height: 3rem;
  margin-left: 1rem;
`

const LogImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 2px;
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 0 0;
  margin: 0.5rem 0;
`
