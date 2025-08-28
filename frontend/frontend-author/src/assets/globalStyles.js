import { createGlobalStyle } from 'styled-components'
import backgroundImage from './forbidden-city.jpg'

const GlobalStyles = createGlobalStyle`
  :root {
    --text-color: rgb(0, 7, 16);
    --error-text-color: rgb(101, 3, 3);
    --background-color: rgb(195, 216, 242);
    --primary-color: rgb(14, 83, 171);
    --primary-color-light: rgb(76, 126, 191);
    --primary-color-dark: rgb(7, 50, 106);
    --secondary-color: rgb(255, 158, 0);
    --secondary-color-light: rgb(255, 191, 87);
    --secondary-color-dark: rgb(162, 100, 0);
  }
  
  body {
    font-family: 'Lucida Console', 'Courier New', Courier, monospace;
    font-size: 16px;
    color: var(--text-color);
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: var(--background-color);
  }

  nav,
  footer {
    background-color: rgb(255, 255, 255, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    margin: auto;
    gap: 4rem;
  }
  
  nav {
    top: 0;
    height: 100px;
  }

  footer {
    color: var(--primary-color-dark);
    font-weight: 700;
    font-size: 1.2rem;
    bottom: 0;
    height: 50px;
  }

  footer a:link {
    color: inherit;
    text-decoration: none;
  }

  footer a:hover,
  footer a:visited {
    color: var(--primary-color);
  }

  header {
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 5rem;
    color: var(--primary-color);
    text-shadow: 5px 5px 5px var(--primary-color-light);
    text-align: center;
    margin-bottom: 0;
  }

  h2 {
    font-size: 3rem;
    color: Var(--primary-color);
    text-align: center;
    margin: 0;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    color: var(--secondary-color-light);
    font-size: 1.5rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  form {
    background-color: var(--primary-color);
    box-shadow: 2px 2px 2px var(--primary-color-light);
    width: max-content;
    margin: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }

  label {
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--background-color);
    margin-right: 1rem;
  }

  input,
  textarea {
    font-family: inherit;
    font-size: 1.2rem;
    color: var(--background-color);
    background-color: var(--primary-color-dark);
    box-shadow: 2px 2px 2px var(--background-color);
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    min-width: 400px;
  }

  .buttonBox {
    align-self: center;
  }

  .button {
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--background-color);
    background-color: var(--primary-color-dark);
    box-shadow: 2px 2px 2px var(--background-color);
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      color: var(--primary-color-dark);
      background-color: var(--background-color);
      box-shadow: 2px 2px 2px var(--primary-color-dark);
    }
  }

  .errorBox {
    display: flex;
    justify-content: flex-end;
  }

  .errors {
    color: var(--error-text-color);
    font-style: italic;
    margin-top: 0.5rem;
    max-width: 425px;
  }
`

export default GlobalStyles
