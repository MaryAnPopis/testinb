import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'

export const GlobalStyles = createGlobalStyle`
  html *{
    box-sizing: border-box;
  }

  body {
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,600i,700,900');
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    margin:0;
    color: #232323;
    box-sizing: border-box;
    background-color: ${colors.bg};
  }

  a {
    text-decoration: none;
  }

  h1,h2,h3,h4,h5 {
    font-weight: 600;
  }

  .hidden{
    display: "none"
  }

  .bg-dark {
    background-color: ${colors.dark}
  }

  input, label, p{
    font-weight: 400;
  }

  .form {
    background-color: white;
    border: solid 1px ${colors.grey};
    border-radius: 5px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding: 1.875rem 3.125rem;
    width: 37.5rem;
    margin: 0 0.5rem;
    margin-bottom:2rem;
  }

  .form__title{
    margin: 0.5rem;
    display: block;
    font-weight: 600;
    font-size: 2rem;
    line-height: 1.8rem;
    color: ${colors.black};
    letter-spacing: normal;
  }

  .form__subtitle{
    font-size: 1rem;
    font-weight: 500;
    color: ${colors.fontGrey};
    margin-bottom: 2rem;
  }

  .form__header{
    text-align: center
  }

  .form-control{
    margin: 1.2rem 0;
    display: flex;
    flex-direction: column;
  }

  .height-vh{
    height: 100vh;
  }

  .container{
  padding-right: 0rem;
  padding-left: 0rem;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
      width: 46.875rem;
  }
  @media (min-width: 992px) {
      width: 60.625rem;
  }
  @media (min-width: 1200px) {
      width: 73.125rem;
  }
}
`
