import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import MenuBar from '../components/MenuBar'
import { colors } from '../styles/colors'
import { Link } from 'react-router-dom'
import { getByParam } from '../services'

const data = {
  labels: ['Passed', 'Failed', 'Skipped'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#3498db', '#e74c3c', '#FFCE56'],
      hoverBackgroundColor: ['#2980b9', '#c0392b', '#FFCE56'],
    },
  ],
}

export class TestRunDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idTestRun: this.props.match.params.idTestRun,
      indexCase: 0,
      testRun: {},
      totalCasesForRun: 0,
      preventRedirect: false,
    }
  }

  componentDidMount() {
    getByParam('testrun', this.state.idTestRun).then(testRunData => {
      this.setState({
        testRun: testRunData[0],
      })
      getByParam('testcase/testsuite', testRunData[0].idTestSuite).then(testCasesData => {
        this.setState({
          totalCasesForRun: testCasesData.length,
        })

        if (this.state.totalCasesForRun <= 0) {
          this.setState({
            preventRedirect: true,
          })
          toast.error(`This Test Suite doesn't have any Test Case yet!`, {
            position: 'bottom-right',
            autoClose: 5000,
          })
        }
      })
    })
  }

  render() {
    return (
      <div>
        <MenuBar />
        <ToastContainer />
        <div className="container">
          <h1>Test Run : {this.state.testRun.name}</h1>
          <BtnWrapper>
            <Run
              to={
                this.state.preventRedirect === true
                  ? this.props.location.pathname
                  : `/testrun/${this.state.idTestRun}/run`
              }
            >
              Start Run
            </Run>
          </BtnWrapper>
          <Stats>
            <GraphContainer>
              <Doughnut data={data} />
            </GraphContainer>
            <GraphContainer>
              <StatItem>
                <StatData>0</StatData>
                <div>
                  <StatTitle>Passed</StatTitle>
                  <StatSubTitle>Test cases have passed</StatSubTitle>
                </div>
              </StatItem>
              <StatItem>
                <StatData>0</StatData>
                <div>
                  <StatTitle>Failed</StatTitle>
                  <StatSubTitle>Test cases have failed</StatSubTitle>
                </div>
              </StatItem>
              <StatItem>
                <StatData>0</StatData>
                <div>
                  <StatTitle>Skipped</StatTitle>
                  <StatSubTitle>Test cases have been skipped</StatSubTitle>
                </div>
              </StatItem>
            </GraphContainer>
          </Stats>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    testrun: state.testrun,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(TestRunDetails)
)

const StatData = styled.h2`
  font-size: 5rem;
  font-weight: 300;
  margin-right: 0.9rem;
`

const StatTitle = styled.h3`
  margin: 0;
  font-size: 1.7rem;
`
const StatSubTitle = styled.small`
  color: ${colors.fontGrey};
  font-size: 0.8rem;
`

const Run = styled(Link)`
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  background-color: ${colors.aqua};
  color: white;
  outline: none;
  text-align: center;
  border-radius: 0.3rem;
  width: 100%;
  padding: 0.5rem 1.8rem;
  &:hover {
    background-color: ${colors.mainColorHover};
  }
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 15rem;
  height: auto;
  margin: 0 0 1.3rem 0.4rem;
`

const StatItem = styled.div`
  width: 100%;
  height: 5.5rem;
  border-bottom: 1px solid ${colors.grey};
  display: flex;
  align-items: center;
`

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const GraphContainer = styled.div`
  width: 35rem;
  margin: 0 0.4rem;
  height: auto;
  padding: 1rem;
  background-color: white;
  border: 1px solid #dcdcdb;
  border-radius: 5px;
`
