import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import MenuBar from '../components/MenuBar'
import Add from '../components/Add'
import { getByParam } from '../services'
import WideCard from '../components/WideCard'
import { colors } from '../styles/colors'

export class TestSuiteDetails extends Component {
  constructor() {
    super()
    this.state = {
      testcases: [],
    }
  }
  componentDidMount() {
    const idTestSuite = this.props.testsuite.id
    getByParam('testcase/testsuite', idTestSuite).then(data => {
      this.setState({
        testcases: data,
      })
      console.log(data)
    })
  }
  render() {
    return (
      <div>
        <MenuBar />
        <div className="container">
          <h1>{this.props.testsuite.title}</h1>
          <Stats>
            <StatItem>
              <bold>Date</bold>
              <span>created on</span>
            </StatItem>
            <StatItem>Number of test cases</StatItem>
            <StatItem>Project {this.props.project.title}</StatItem>
          </Stats>
          <Add path={`/project/testsuite/details/${this.props.testsuite.id}/addtestcase`} />
          {this.state.testcases.map(suite => {
            return (
              <WideCard
                key={suite.id}
                title={suite.title}
                creationDate={suite.creation_date}
                route="testsuite/details"
                id={suite.id}
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
    testsuite: state.testsuite,
    project: state.project,
  }
}

export default connect(
  mapStateToProps,
  null
)(TestSuiteDetails)

const StatItem = styled.div`
  padding: 1rem;
  width: 33.33333333333333%;
`

const Stats = styled.div`
  border: 1px solid #dcdcdb;
  background-color: #fff;
  margin-bottom: 1rem;
  border-radius: 5px;
  display: flex;
`
