import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import MenuBar from '../components/MenuBar'
import { add_test_suite_store } from '../actions'
import Loader from '../components/Loader'
import { colors } from '../styles/colors'
import { getByParam } from '../services'
import WideCard from '../components/WideCard'

export class TestSuites extends Component {
  constructor(props) {
    super(props)
    const projectId = this.props.project.id
    const projectTitle = this.props.project.title
    this.state = {
      projectTitle: projectTitle,
      fetchInProgress: false,
      idProject: projectId,
      testsuites: [],
    }
  }
  componentDidMount() {
    this.setState({
      fetchInProgress: true,
    })
    getByParam('testsuite/project', this.state.idProject).then(data => {
      this.setState({
        testsuites: data,
        fetchInProgress: false,
      })
    })
  }
  render() {
    return (
      <div>
        {this.state.fetchInProgress && <Loader color={colors.black} />}
        <MenuBar />
        <div className="container">
          <h1>{this.state.projectTitle} Test Suites</h1>
          <AddProject>
            <AddLink to="/add/testsuite">
              <img src="https://app.hiptest.com/assets/on-boarding/icon-plus.svg" alt="" />
            </AddLink>
          </AddProject>
          {this.state.testsuites.map(suite => {
            return (
              <WideCard
                key={suite.id}
                title={suite.title}
                creationDate={suite.creation_date}
                route="testsuite/details"
                id={suite.id}
                setTestSuite={() =>
                  this.props.setTestSuite({
                    title: suite.title,
                    creationDate: suite.creation_date,
                    id: suite.id,
                    idProject: suite.idProject,
                  })
                }
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    project: state.project,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTestSuite: testSuite => dispatch(add_test_suite_store(testSuite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestSuites)

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
  width: 100%;
  height: auto;
  padding: 1rem;
`
