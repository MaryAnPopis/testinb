import React, { Component } from 'react'
import styled from 'styled-components'
import MenuBar from '../components/MenuBar'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'

export class Project extends Component {
  render() {
    return (
      <div>
        <MenuBar />
        <div className="container">
          <FormWrapper>
            <form className="form">
              <div className="form__header">
                <h2 className="form__title">Create a project</h2>
              </div>
              <div className="form-control">
                <Label name="Project name" />
                <Input type="text" placeholder="Jira" />
              </div>
              <Button name="Create" />
            </form>
          </FormWrapper>
        </div>
      </div>
    )
  }
}

export default Project

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`
