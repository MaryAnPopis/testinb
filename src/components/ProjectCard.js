import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../styles/colors'

function ProjectCard(props) {
  return (
    <Card to={`project/details/${props.id}`} onClick={e => props.onProjectClick(e)}>
      <h2>{props.title}</h2>
      <SubTitle>Creation date : {props.date}</SubTitle>
    </Card>
  )
}

export default ProjectCard

const Card = styled(Link)`
  width: 17rem;
  height: 23rem;
  background-color: white;
  border-radius: 2px;
  border: 1px solid #dcdcdb;
  padding: 1rem;
  margin: 5px; /* and that, will result in a 10px gap */
  color: #232323;
  &::hover {
    -webkit-box-shadow: 10px 10px 22px -7px rgba(181, 181, 181, 1);
    -moz-box-shadow: 10px 10px 22px -7px rgba(181, 181, 181, 1);
    box-shadow: 10px 10px 22px -7px rgba(181, 181, 181, 1);
  }
`

const SubTitle = styled.small`
  color: ${colors.fontGrey};
`
