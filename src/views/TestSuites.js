import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuBar from '../components/MenuBar'
import { add_test_suite_store, add_tests_suites_project, deleteItem } from '../actions'
import Loader from '../components/Loader'
import { colors } from '../styles/colors'
import { getByParam } from '../services'
import WideCard from '../components/WideCard'
import Add from '../components/Add'

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
    getByParam('testsuite/project', this.state.idProject)
      .then(data => {
        console.log('test suite list')
        this.props.setTestsSuites(data)
        this.setState({
          testsuites: this.props.testsuiteslist,
          fetchInProgress: false,
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
        <MenuBar />
        <div className="container">
          <h1>Project {this.state.projectTitle}</h1>
          <Add path={`/add/testsuite`} />
          <h3>Test Suites</h3>
          {this.props.testsuiteslist.map(suite => {
            return suite.isActive ? (
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
                onDelete={() =>
                  this.props.onDelete({
                    title: suite.title,
                    creationDate: suite.creation_date,
                    id: suite.id,
                    idProject: suite.idProject,
                    path: 'testsuite',
                    list: 'testsuiteslist',
                  })
                }
              />
            ) : (
              ''
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
    testsuiteslist: state.testsuiteslist,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: item => dispatch(deleteItem(item)),
    setTestSuite: testSuite => dispatch(add_test_suite_store(testSuite)),
    setTestsSuites: testsuites => dispatch(add_tests_suites_project(testsuites)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestSuites)
