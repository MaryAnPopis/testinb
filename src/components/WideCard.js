import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from '../styles/colors'

const WideCard = props => {
  return (
    <Card>
      <ButtonIcon>
        <Trash>
          <Icon xmlns="http://www.w3.org/2000/svg" width="58" height="62" viewBox="0 0 58 62">
            <g id="trash-simple" transform="translate(-3 -1)">
              <path
                id="Path_1"
                data-name="Path 1"
                d="M54,18V58a4,4,0,0,1-4,4H14a4,4,0,0,1-4-4V18"
                fill="none"
                stroke="gray"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                id="Line_1"
                data-name="Line 1"
                y2="22"
                transform="translate(32 27)"
                fill="none"
                stroke="gray"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                id="Line_2"
                data-name="Line 2"
                y2="22"
                transform="translate(22 27)"
                fill="none"
                stroke="gray"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                id="Line_3"
                data-name="Line 3"
                y2="22"
                transform="translate(42 27)"
                fill="none"
                stroke="gray"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                id="Path_2"
                data-name="Path 2"
                d="M22,12V2H42V12"
                fill="none"
                stroke="gray"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                id="Line_4"
                data-name="Line 4"
                x1="56"
                transform="translate(4 12)"
                fill="none"
                stroke="gray"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </g>
          </Icon>
        </Trash>
      </ButtonIcon>
      <TextWrapper>
        <Title
          to={`${props.route}/${props.id}`}
          className="margin-0"
          onClick={e => props.setTestSuite(e)}
        >
          {props.title}
        </Title>
        <SubTitle className="margin-0">Created on: {props.creationDate}</SubTitle>
      </TextWrapper>
    </Card>
  )
}

export default WideCard

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 2rem;
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
const Icon = styled.svg`
  width: 100%;
  height: auto;
`

const ButtonIcon = styled.button`
  border: 0;
  outline: none;
  cursor: pointer;
  background: none;
`
