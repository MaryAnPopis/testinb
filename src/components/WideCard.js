import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from '../styles/colors'
import Modal from './Modal'
import eyeIcon from '../img/eye-19.svg'
import trashIcon from '../img/trash-simple.svg'

class WideCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = { show: false }
  }

  showModal() {
    this.setState({ show: true })
  }

  hideModal() {
    this.setState({ show: false })
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.show}
          id={this.props.idItem}
          handleClose={this.hideModal.bind(this)}
        />
        <Card>
          <ButtonIcon onClick={e => this.props.onDelete(e)}>
            <Trash>
              <img src={trashIcon} alt="" />
            </Trash>
          </ButtonIcon>
          <ButtonIcon
            onClick={this.showModal.bind(this)}
            className={this.props.showEye ? 'show' : 'hidden'}
          >
            <img src={eyeIcon} alt="view more" />
          </ButtonIcon>
          <TextWrapper>
            <Title
              to={`${this.props.route}/${this.props.id}`}
              className="margin-0"
              onClick={e => {
                this.props.setTestSuite(e)
              }}
            >
              {this.props.title}
            </Title>
            <SubTitle className="margin-0">Created on: {this.props.creationDate}</SubTitle>
          </TextWrapper>
        </Card>
      </div>
    )
  }
}

export default WideCard

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 1rem;
`

const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #dcdcdb;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`
const SubTitle = styled.small`
  color: ${colors.fontGrey};
`
const Title = styled(Link)`
  font-size: 1.5rem;
  color: ${colors.dark};
`
const Trash = styled.div`
  width: 2.4rem;
  height: 3rem;
  padding: 0;
  margin: 0;
`

const ButtonIcon = styled.button`
  border: 0;
  outline: none;
  cursor: pointer;
  background: none;
`
