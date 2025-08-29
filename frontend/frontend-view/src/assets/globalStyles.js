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
    --headers-font: 'Lucida Console', 'Courier New', Courier, monospace;
  }
  
  body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    color: var(--text-color);
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: rgb(220, 86, 64);
  }

  header {
    margin-bottom: 1rem;
  }

  h1 {
    font-family: var(--headers-font);
    font-size: 3rem;
    color: var(--primary-color-dark);
    text-shadow: 2px 2px 2px var(--primary-color);
    text-align: center;
    margin-bottom: 0;
  }

  h2 {
    font-family: var(--headers-font);
    font-size: 2.2rem;
    color: Var(--primary-color);
    text-shadow: 2px 2px 2px var(--primary-color-light);
    text-align: center;
    margin: 0;
  }

  h3 {
    font-family: var(--headers-font);
    font-size: 1.6rem;
    margin: 0.5rem 0;
  }

  h4 {
    font-family: var(--headers-font);
    color: var(--secondary-color-light);
    font-size: 1.2rem;
    margin: 0.5rem 0;
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
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }

  label {
    font-family: inherit;
    font-weight: 700;
    color: var(--background-color);
    margin-right: 1rem;
  }

  input,
  textarea {
    font-family: inherit;
    color: var(--background-color);
    background-color: var(--primary-color-dark);
    border: none;
    outline: none;
    padding: 0.4rem 0.8rem;
    min-width: 400px;
  }

  .buttonBox {
    align-self: center;
  }

  .button {
    font-family: inherit;
    font-weight: 700;
    color: var(--background-color);
    background-color: var(--primary-color-dark);
    border: none;
    outline: none;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    &:hover {
      color: var(--primary-color-dark);
      background-color: var(--background-color);
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
