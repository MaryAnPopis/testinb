import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { current_run_case, index_case } from '../actions'
import { getByParam } from '../services'
import MenuBar from '../components/MenuBar'
import Button from '../components/Button'
import { colors } from '../styles/colors'

export class Run extends Component {
  constructor() {
    super()
    this.state = {
      indexCase: 0,
      idTestSuite: 0,
      idTestRun: 0,
      id: 0,
      attachment: '',
      creation_date: '',
      description: '',
      expected_result: '',
      isActive: 1,
      steps: '',
      title: '',
    }
  }
  componentDidMount() {
    const idTestSuite = this.props.testsuite.id
    getByParam('testcase/testsuite', idTestSuite).then(data => {
      console.log(data)
      this.props.setIndexCase(this.state.indexCase)
      this.props.setCurrentCase(data[this.props.indexCase])
    })
  }

  render() {
    return (
      <div>
        <MenuBar />
        <div className="container">
          <h1>Run : {this.props.testsuite.title}</h1>
          <Paper className="form">
            <div>
              <h2>
                {this.props.currentRunCase.id} - {this.props.currentRunCase.title}
              </h2>

              <div className="form-control">
                <Label>Description</Label>
                <Content>{this.props.currentRunCase.description}</Content>
              </div>

              <div className="form-control">
                <Label>Steps</Label>

                <pre>
                  <Content>{this.props.currentRunCase.steps}</Content>
                </pre>
              </div>

              <div className="form-control">
                <Label>Expected Result</Label>
                <Content>{this.props.currentRunCase.expected_result}</Content>
              </div>
              <div className="form-control">
                <Label>Attachment</Label>
                <ImgContainer>
                  <Img src={this.props.currentRunCase.attachment} alt="test case attachment" />
                </ImgContainer>
                <a href={this.props.currentRunCase.attachment} target="_blank">
                  Download attachment
                </a>
              </div>
              <BtnWrapper>
                <Btn>
                  <Button name="Passed" />
                </Btn>
                <Btn>
                  <Button name="Failed" />
                </Btn>
                <Btn>
                  <Button name="Skipped" />
                </Btn>
              </BtnWrapper>
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    testsuite: state.testsuite,
    currentRunCase: state.currentRunCase,
    indexCase: state.indexCase,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCase: testcase => dispatch(current_run_case(testcase)),
    setIndexCase: indexCase => dispatch(index_case(indexCase)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Run)

const Label = styled.small`
  color: ${colors.fontGrey};
  font-size: 1rem;
`

const Content = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
`

const Paper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 47.5rem;
  margin-bottom: 3rem;
`

const Btn = styled.div`
  width: 9rem;
  margin: 0 0.4rem;
`

const BtnWrapper = styled.div`
  display: flex;
`
const ImgContainer = styled.div`
  width: 40rem;
  height: 20rem;
  margin-bottom: 0.2rem;
`
const Img = styled.img`
  width: 100%;
`
