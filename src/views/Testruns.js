import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import MenuBar from '../components/MenuBar'
import Add from '../components/Add'
import WideCard from '../components/WideCard'
import Loader from '../components/Loader'
import { getByParam } from '../services'
import { colors } from '../styles/colors'
import { add_test_runs_to_store } from '../actions'
import * as moment from 'moment-mini'

export class Testruns extends Component {
  constructor() {
    super()
    this.state = {
      fetchInProgress: false,
    }
  }

  componentDidMount() {
    this.setState({
      fetchInProgress: true,
    })
    getByParam('testrun/group', this.props.group.idGroup)
      .then(data => {
        this.props.setTestRuns(data)
        this.setState({
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
          <h1>Test Runs</h1>
          <Add path={`/add/testrun`} />
          <h3>Test Cases</h3>
          {this.props.testrunslist.map(item => {
            return (
              <WideCard
                key={item.id}
                title={item.name}
                creationDate={item.creation_date}
                route="testrun"
                id={item.id}
                idItem={item.id}
                showEye={false}
                showTrash={false}
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
    group: state.group,
    testrunslist: state.testrunslist,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTestRuns: testcases => dispatch(add_test_runs_to_store(testcases)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Testruns)
