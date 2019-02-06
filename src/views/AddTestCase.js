import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import Loader from '../components/Loader'
import { post, getCurrentDate, upload } from '../services'
import MenuBar from '../components/MenuBar'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import { colors } from '../styles/colors'

export class AddTestCase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      steps: '',
      expected_result: '',
      attachment: '',
      isActive: true,
      creation_date: getCurrentDate(),
      image: '',
      accepted: [],
      fetchInProgress: false,
      dragOverStatus: null,
      ref: (this.ref = React.createRef()),
      redirect: false,
    }
    this.getFileKey = this.getFileKey.bind(this)
  }

  onDrop(acceptedFile) {
    this.setState({
      image: acceptedFile[0],
      accepted: acceptedFile.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    })
  }

  getFileKey(file) {
    return `${file.name}_${file.size}`
  }
  componentWillUnmount() {
    this.state.accepted.forEach(file => {
      window.URL.revokeObjectURL(file.preview)
    })
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      fetchInProgress: true,
    })
    const uploadImage = this.state.image
    upload('upload/image-upload', 'image', uploadImage)
      .then(data => {
        return data.imageUrl
      })
      .then(urlCreated => {
        this.setState({
          attachment: urlCreated,
        })
        const testcase = {
          title: this.state.title,
          creation_date: this.state.creation_date,
          description: this.state.description,
          expected_result: this.state.expected_result,
          attachment: this.state.attachment,
          steps: this.state.steps,
          isActive: this.state.isActive,
        }
        post('testcase', testcase).then(data => {
          const testCaseOnTestSuite = {
            idTestSuite: this.props.testsuite.id,
            idTestCase: data.insertId,
          }
          post('testcase/testsuite', testCaseOnTestSuite).then(data => {
            this.setState({
              fetchInProgress: false,
              redirect: true,
            })
          })
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
          <Redirect to={`/project/testsuites`} />
        ) : (
          this.state.fetchInProgress && <Loader color={colors.black} />
        )}
        <MenuBar />
        <div className="container">
          <FormWrapper>
            <form className="form" onSubmit={e => this.handleSubmit(e)}>
              <div className="form__header">
                <h2 className="form__title">Create a Test Case</h2>
              </div>
              <div className="form-control">
                <Label name="Title" />
                <Input
                  type="text"
                  placeholder="Verify if the user can login"
                  value={this.state.title}
                  name="title"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="form-control">
                <Label name="Description" />
                <Input
                  type="text"
                  placeholder="Test if the user can enter the application..."
                  value={this.state.description}
                  name="description"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="form-control">
                <Label name="Steps" />
                <TextArea
                  rows="10"
                  type="text"
                  placeholder="1.Go to konrad.com..."
                  value={this.state.steps}
                  name="steps"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="form-control">
                <Label name="Expected result" />
                <TextArea
                  type="text"
                  rows="4"
                  placeholder="The user can login..."
                  value={this.state.expected_result}
                  name="expected_result"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="form-control">
                <Label name="Attached file" />
                <DropZone
                  ref={this.state.ref}
                  accept="image/*"
                  maxSize={1000000}
                  onDrop={this.onDrop.bind(this)}
                  onDragOver={(...args) => {
                    return [...args]
                  }}
                  multiple={false}
                >
                  {this.state.accepted.map(file => {
                    return (
                      <div key={file.name}>
                        <PreviewImage key={file.name} src={file.preview} alt="preview" />
                      </div>
                    )
                  })}
                  <div>
                    <div style={this.state.image === '' ? { display: 'block' } : hidden}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="154"
                          height="160"
                          viewBox="0 0 124 149.427"
                        >
                          <g id="logo" transform="translate(-200 -223.573)">
                            <g id="upload-logo">
                              <g id="cloud-computing" transform="translate(232 276.5)">
                                <path
                                  id="Path_144"
                                  data-name="Path 144"
                                  d="M50.975,20.694A17.122,17.122,0,0,0,34.084,4.5a17.627,17.627,0,0,0-13.946,7.008c-.074-.039-.153-.065-.228-.1-.2-.1-.4-.188-.6-.269-.115-.045-.23-.086-.346-.127-.2-.071-.406-.133-.615-.19-.116-.031-.231-.063-.349-.09-.224-.051-.452-.09-.683-.124-.1-.015-.2-.035-.305-.047A9.278,9.278,0,0,0,16,10.5a9.01,9.01,0,0,0-9,9c0,.129.007.255.016.381A13.827,13.827,0,0,0,0,31.654,12.86,12.86,0,0,0,12.845,44.5H18a1,1,0,0,0,0-2H12.845A10.857,10.857,0,0,1,2,31.654,11.888,11.888,0,0,1,8.432,21.4L9,21.13V20.5c0-.123.008-.249.015-.375l.009-.175-.012-.188C9.007,19.675,9,19.588,9,19.5a6.953,6.953,0,0,1,7.917-6.933c.078.01.155.023.232.036a6.867,6.867,0,0,1,.792.177c.034.01.069.016.1.026a6.86,6.86,0,0,1,.838.322c.069.031.137.065.2.1a6.842,6.842,0,0,1,.707.4A7,7,0,0,1,23,19.5a1,1,0,0,0,2,0,8.979,8.979,0,0,0-3.2-6.871A15.838,15.838,0,0,1,34.084,6.5,15.1,15.1,0,0,1,48.932,20.387a19.042,19.042,0,0,0-4.083.125A1,1,0,0,0,45,22.5a.983.983,0,0,0,.152-.012,18.438,18.438,0,0,1,4.684,0A10.249,10.249,0,0,1,58,32.472,10.04,10.04,0,0,1,47.972,42.5H44a1,1,0,0,0,0,2h3.972A12.042,12.042,0,0,0,60,32.472,12.307,12.307,0,0,0,50.975,20.694Z"
                                  fill="#dedede"
                                />
                                <path
                                  id="Path_145"
                                  data-name="Path 145"
                                  d="M31.708,30.794a.99.99,0,0,0-.326-.217,1,1,0,0,0-1.09.217l-8,8a1,1,0,1,0,1.414,1.414L30,33.914V54.5a1,1,0,0,0,2,0V33.914l6.293,6.293a1,1,0,0,0,1.414-1.414Z"
                                  fill="#dedede"
                                />
                              </g>
                              <g id="Group_13" data-name="Group 13" transform="translate(-7 43)">
                                <g id="testinb-logo" transform="translate(87 162)">
                                  <text
                                    id="testinb"
                                    transform="translate(173.481 50)"
                                    fill="#dedede"
                                    fontSize="9"
                                    fontFamily="SegoeUI, Segoe UI"
                                  >
                                    <tspan x="0" y="0">
                                      testinb
                                    </tspan>
                                  </text>
                                  <g id="ic_bug_report_48px" transform="translate(252 91.392)">
                                    <path
                                      id="Path_143"
                                      data-name="Path 143"
                                      d="M14.592,8.2H13.434a2.569,2.569,0,0,0-.748-.862l.669-.715L12.773,6l-.9.956a2.231,2.231,0,0,0-1.162,0L9.819,6l-.583.622.669.715a2.569,2.569,0,0,0-.748.862H8v.879h.861a2.81,2.81,0,0,0-.037.44v.44H8v.879h.824v.44a2.81,2.81,0,0,0,.037.44H8V12.6H9.158a2.392,2.392,0,0,0,4.276,0h1.158v-.879h-.861a2.81,2.81,0,0,0,.037-.44v-.44h.824V9.958h-.824v-.44a2.81,2.81,0,0,0-.037-.44h.861ZM12.12,11.716H10.472v-.879H12.12Zm0-1.759H10.472V9.078H12.12Z"
                                      transform="translate(-94 -54)"
                                      fill="#00d6d6"
                                    />
                                  </g>
                                </g>
                                <g id="single-folded-content" transform="translate(241 152)">
                                  <path
                                    id="Path_146"
                                    data-name="Path 146"
                                    d="M40,2V16.529H54.79"
                                    transform="translate(-6.79 27)"
                                    fill="none"
                                    stroke="#dedede"
                                    strokeMiterlimit="10"
                                    strokeWidth="2"
                                  />
                                  <path
                                    id="Path_147"
                                    data-name="Path 147"
                                    d="M34.667,2H8V52.47H48V15.459Z"
                                    transform="translate(0 27.573)"
                                    fill="none"
                                    stroke="#dedede"
                                    strokeLinecap="square"
                                    strokeMiterlimit="10"
                                    strokeWidth="2"
                                  />
                                </g>
                                <text
                                  id="_.jpg"
                                  data-name=".jpg"
                                  transform="translate(252 227)"
                                  fill="#dedede"
                                  fontSize="3"
                                  fontFamily="SegoeUI, Segoe UI"
                                >
                                  <tspan x="0" y="0">
                                    .jpg
                                  </tspan>
                                </text>
                              </g>
                            </g>
                            <text
                              id="Upload_your_logo_1m_max"
                              data-name="Upload your logo
1m max"
                              transform="translate(262 353)"
                              fill="#dedede"
                              fontSize="16"
                              fontFamily="SegoeUI, Segoe UI"
                            >
                              <tspan x="-61.879" y="0">
                                Upload your image
                              </tspan>
                              <tspan fontSize="12">
                                <tspan x="-21.021" y="17">
                                  1m max
                                </tspan>
                              </tspan>
                            </text>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </DropZone>
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
const hidden = {
  display: 'none',
}

const DropZone = styled(Dropzone)`
  padding: 20px;
  border: 2px dashed rgb(112, 112, 112, 0.3);
  border-radius: 5px;
  width: 100%;
  height: 13.9375rem;
  margin: 0 auto 25px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  cursor: pointer;
  &.active {
    border-color: #27ae60;
  }
  &.reject {
    border-color: #e74c3c;
  }
`

const PreviewImage = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

DropZone.defaultProps = {
  activeClassName: 'active',
  rejectClassName: 'reject',
}

const TextArea = styled.textarea`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.fontGrey};
  letter-spacing: normal;
  padding: 10px 15px;
  border-radius: 4px;
  border: solid 1.5px #d9d9d9;
  outline: transparent;
  &:focus {
    border: solid 1.5px ${colors.black};
  }
`
