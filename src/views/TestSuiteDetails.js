import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import MenuBar from '../components/MenuBar'
import Add from '../components/Add'
import { getByParam } from '../services'
import WideCard from '../components/WideCard'
import { colors } from '../styles/colors'
import Loader from '../components/Loader'

import * as moment from 'moment-mini'

const getDay = date => {
  var formatted = new Date(date)
  return moment(formatted).format('D')
}

const getMonth = date => {
  var formatted = new Date(date)
  return moment(formatted).format('MMMM')
}
const getYear = date => {
  var formatted = new Date(date)
  return moment(formatted).format('Y')
}

export class TestSuiteDetails extends Component {
  constructor() {
    super()
    this.state = {
      testcases: [],
      fetchInProgress: false,
    }
  }
  componentDidMount() {
    const idTestSuite = this.props.testsuite.id
    this.setState({
      fetchInProgress: true,
    })
    getByParam('testcase/testsuite', idTestSuite).then(data => {
      this.setState({
        testcases: data,
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
          <h1>{this.props.testsuite.title}</h1>
          <Stats>
            <StatItem>
              <TitleStat>
                Date <br />
                <SubTitle> created on</SubTitle>
              </TitleStat>
              <Style.Wrapper>
                <Style.Mark>{getDay(this.props.testsuite.creationDate)}</Style.Mark>
                <Style.RightPane>
                  <span>{getMonth(this.props.testsuite.creationDate)}</span>
                  <span>{getYear(this.props.testsuite.creationDate)}</span>
                </Style.RightPane>
              </Style.Wrapper>
            </StatItem>
            <StatItem>
              <TitleStat>
                Number <br />
                <SubTitle> of test cases</SubTitle>
              </TitleStat>
              <Style.Wrapper>
                <Style.Mark>{this.state.testcases.length}</Style.Mark>
              </Style.Wrapper>
            </StatItem>
            <StatItem>
              <TitleStat>
                Name <br />
                <SubTitle> of the project</SubTitle>
              </TitleStat>
              <Style.Wrapper>
                <Style.Mark>{this.props.project.title}</Style.Mark>
              </Style.Wrapper>
            </StatItem>
          </Stats>
          <Add path={`/project/testsuite/details/${this.props.testsuite.id}/addtestcase`} />
          <h3>Test Cases</h3>
          {this.state.testcases.map(item => {
            return (
              <WideCard
                key={item.id}
                title={item.title}
                creationDate={item.creation_date}
                route=""
                id={item.id}
                idItem={item.id}
                showEye={true}
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

const TitleStat = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1.2rem;
`
const SubTitle = styled.span`
  color: ${colors.fontGrey};
  font-weight: 400;
  font-size: 1rem;
`

const Style = {}

Style.Wrapper = styled.span`
  display: flex;
  align-items: center;
`

Style.RightPane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0.4rem;
`

Style.Mark = styled.span`
  font-size: 3rem;
  font-weight: 600;
  color: ${colors.aqua};
`
