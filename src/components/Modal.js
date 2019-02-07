import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import Input from './Input'
import Textarea from './Textarea'
import Label from './Label'
import Button from './Button'
import { colors } from '../styles/colors'
import pencilIcon from '../img/pencil.svg'
import { getByParam, patch, upload } from '../services'

class Modal extends Component {
  constructor(props) {
    super(props)
    const idCase = this.props.id
    this.state = {
      attachment: '',
      creation_date: '',
      description: '',
      expected_result: '',
      idCase: idCase,
      id: 0,
      isActive: 1,
      steps: '',
      title: '',
      image: '',
      isDisabled: true,
      accepted: [],
      fetchInProgress: false,
      dragOverStatus: null,
      ref: (this.ref = React.createRef()),
      redirect: false,
    }
  }

  onDrop(acceptedFile) {
    this.setState({
      image: acceptedFile[0],
      accepted: acceptedFile.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
      attachment: acceptedFile[0],
    })
  }

  getFileKey(file) {
    return `${file.name}_${file.size}`
  }

  componentDidMount() {
    getByParam('testcase', this.state.idCase).then(data => {
      this.setState({
        attachment: data[0].attachment,
        creation_date: data[0].creation_date,
        description: data[0].description,
        expected_result: data[0].expected_result,
        id: data[0].id,
        isActive: data[0].isActive,
        steps: data[0].steps,
        title: data[0].title,
      })
    })
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

  handleDisabled() {
    this.setState({
      isDisabled: !this.state.isDisabled,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      fetchInProgress: true,
    })
    const uploadImage = this.state.image
    if (this.state.image !== '') {
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
            description: this.state.description,
            expected_result: this.state.expected_result,
            attachment: this.state.attachment,
            steps: this.state.steps,
          }
          patch(`testcase/${this.state.idCase}`, testcase)
        })
        .catch(err => {
          throw err
        })
    } else {
      const testcase = {
        title: this.state.title,
        description: this.state.description,
        expected_result: this.state.expected_result,
        attachment: this.state.attachment,
        steps: this.state.steps,
      }
      patch(`testcase/${this.state.idCase}`, testcase).catch(err => {
        throw err
      })
    }
    this.setState({
      isDisabled: !this.state.isDisabled,
    })
  }

  render() {
    return (
      <Style.Modal style={this.props.show ? Style.displayBlock : Style.displayNone}>
        <CloseButton type="button" aria-label="Close" onClick={this.props.handleClose}>
          <Style.Close aria-hidden="true" className="h1">
            &times;
          </Style.Close>
        </CloseButton>
        <Style.MainModal className="row">
          <EditWrapper>
            <EditButton onClick={this.handleDisabled.bind(this)}>
              <img src={pencilIcon} alt="edit icon" />
            </EditButton>
          </EditWrapper>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Input
              name="title"
              value={this.state.title}
              type="text"
              textAlign={{ direction: 'center' }}
              fontSize={{ size: '1.4rem' }}
              borderState={this.state.isDisabled ? disabled : enabled}
              fontColor={{ color: colors.dark }}
              isDisabled={this.state.isDisabled ? false : true}
              onChange={e => this.handleChange(e)}
            />

            <div className="form-control">
              <Label name="Description" />
              <Input
                name="description"
                value={this.state.description}
                type="text"
                fontColor={{ color: colors.dark }}
                borderState={this.state.isDisabled ? disabled : enabled}
                onChange={e => this.handleChange(e)}
                isDisabled={this.state.isDisabled ? false : true}
              />
            </div>
            <div className="form-control">
              <Label name="Steps" />
              <Textarea
                type="text"
                rows="6"
                value={this.state.steps}
                name="steps"
                onChange={e => this.handleChange(e)}
                fontSize={{ size: '1rem' }}
                fontColor={{ color: colors.dark }}
                borderState={this.state.isDisabled ? disabled : enabled}
                isDisabled={this.state.isDisabled ? false : true}
              />
            </div>
            <div className="form-control">
              <Label name="Expected result" />
              <Textarea
                type="text"
                rows="3"
                value={this.state.expected_result}
                name="expected_result"
                onChange={e => this.handleChange(e)}
                fontSize={{ size: '1rem' }}
                fontColor={{ color: colors.dark }}
                borderState={this.state.isDisabled ? disabled : enabled}
                isDisabled={this.state.isDisabled ? false : true}
              />
            </div>
            <div className="form-control">
              <Label name="Attachment" />
              <DropZone
                className={this.state.isDisabled ? 'dz-max-files-reached ' : ''}
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
                  <div style={this.state.image === '' ? { display: 'block' } : hidden} />
                  <PreviewImage src={this.state.attachment} alt="" />
                </div>
              </DropZone>
              <a href={this.state.attachment} target="_blank">
                Download attachment
              </a>
            </div>
            <Button
              name="Update "
              style={this.state.isDisabled ? Style.displayNone : Style.displayBlock}
            />
          </form>
        </Style.MainModal>
      </Style.Modal>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.number,
}

export default Modal

// Styles
const Style = {}

const disabled = {
  border: 'solid 1.5px white',
}

const enabled = {
  border: 'solid 1.5px #d9d9d9',
}

const EditButton = styled.button`
  border: none;
  background-color: Transparent;
  cursor: pointer;
  outline: none;
`

const CloseButton = styled(EditButton)`
  font-size: 5rem;
  position: absolute;
  right: 0;
`
const EditWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

Style.Title = styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: center;
`

Style.displayBlock = {
  display: 'block',
}

Style.displayNone = {
  display: 'none',
}

Style.paddingLeft = {
  'padding-left': '0px',
}

Style.Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  overflow: scroll;
  overflow-x: hidden;
`

Style.MainModal = styled.div`
  position: relative;
  background: white;
  max-width: 47rem;
  padding: 3rem;
  height: auto;
  top: 35rem;
  left: 50%;
  margin: 10px 0 60px 0;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`

Style.ImgHolder = styled.div``

Style.Img = styled.img`
  width: 600px;
  height: 600px;
  object-fit: cover;
  border-radius: 5px 0 0 5px;
`

Style.Comment = styled.p`
  font-size: 14px;
  margin: 0;
  padding: 0;
  display: inline;
`

Style.Avatar = styled.img`
  background: #ff6e7f; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #bfe9ff, #ff6e7f); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #bfe9ff,
    #ff6e7f
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  clip-path: circle(20px at center);
`

Style.Close = styled.span`
  color: ${colors.bg};
  z-index: 2;
  font-weight: 600;
`
const hidden = {
  display: 'none',
}

const DropZone = styled(Dropzone)`
  padding: 20px;
  border: 2px dashed rgb(112, 112, 112, 0.3);
  border-radius: 5px;
  width: 100%;
  height: 17.9375rem;
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
