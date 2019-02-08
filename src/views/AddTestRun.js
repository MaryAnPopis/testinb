import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Loader from '../components/Loader'
import { getByParam, getCurrentDate, post, loadSession } from '../services'
import MenuBar from '../components/MenuBar'
import Label from '../components/Label'
import Button from '../components/Button'
import { colors } from '../styles/colors'

export class AddTestCase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      idTestSuite: '',
      testSuites: [],
      isActive: true,
      creation_date: getCurrentDate(),
    }
  }

  componentDidMount() {
    getByParam('testsuite/project', this.props.project.id).then(data => {
      let arrTen = []
      data.forEach(item => {
        arrTen.push(
          <option key={item.id} id={item.id} value={item.id} name="idTestSuite">
            {' '}
            {item.title}{' '}
          </option>
        )
      })
      this.setState({
        testSuites: arrTen,
      })
    })
  }

  handleChange(e) {
    let index = e.nativeEvent.target.selectedIndex
    let selected = e.nativeEvent.target[index]
    this.setState({
      idTestSuite: Number(selected.id),
      name: selected.text,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      fetchInProgress: true,
    })
    const currentUserId = loadSession()
    const idGroup = this.props.group.idGroup
    const testrun = {
      creation_date: getCurrentDate(),
      ownerRun: currentUserId.user.userId,
      idGroup: idGroup,
      name: this.state.name,
      idTestSuite: this.state.idTestSuite,
      isActive: this.state.isActive,
    }

    post('testrun', testrun)
      .then(data => {
        this.setState({
          fetchInProgress: false,
          redirect: true,
        })
      })
      .catch(err => {
        throw err
      })
  }

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to={`/testruns`} />
        ) : (
          this.state.fetchInProgress && <Loader color={colors.black} />
        )}
        <MenuBar />
        <div className="container">
          <FormWrapper>
            <form className="form" onSubmit={e => this.handleSubmit(e)}>
              <div className="form__header">
                <h2 className="form__title">Create a Test Run</h2>
              </div>
              <div className="form-control">
                <Label name="Select the test suite for the run" />
                <Select id="select" onChange={e => this.handleChange(e)}>
                  <option>Select a test suite</option>
                  {this.state.testSuites}
                </Select>
              </div>
              <Button name="Create" />
            </form>
          </FormWrapper>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    testsuite: state.testsuite,
    project: state.project,
    group: state.group,
  }
}

export default connect(
  mapStateToProps,
  null
)(AddTestCase)

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`
const Select = styled.select`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 20px;
  color: ${colors.black};
  letter-spacing: normal;
  padding: 10px 15px;
  border-radius: 4px;
  border: 2px solid #d9d9d9;
  outline: transparent;
  width: 100%;
  cursor: pointer;
  &:focus {
    border: solid 1.5px ${colors.black};
  }
`
