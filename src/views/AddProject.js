import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Loader from '../components/Loader'
import { post, getCurrentDate } from '../services'
import MenuBar from '../components/MenuBar'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import { colors } from '../styles/colors'

export class AddProject extends Component {
  constructor(props) {
    super(props)
    const groupId = this.props.state.group.idGroup
    this.state = {
      name: '',
      groupId: groupId,
      fetchInProgress: false,
      redirect: false,
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({
      fetchInProgress: true,
    })
    const project = {
      name: this.state.name,
      creation_date: getCurrentDate(),
      idGroup: this.state.groupId,
      isActive: true,
    }
    post('project', project)
      .then(data => {
        this.setState({
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
          <Redirect to={`/home`} />
        ) : (
          this.state.fetchInProgress && <Loader color={colors.black} />
        )}
        <MenuBar />
        <div className="container">
          <FormWrapper>
            <form className="form" onSubmit={e => this.handleSubmit(e)}>
              <div className="form__header">
                <h2 className="form__title">Create a project</h2>
              </div>
              <div className="form-control">
                <Label name="Project name" />
                <Input
                  type="text"
                  placeholder="Jira"
                  value={this.state.name}
                  name="name"
                  onChange={e => this.handleChange(e)}
                />
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
    state: state,
  }
}

export default connect(
  mapStateToProps,
  null
)(AddProject)

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`
