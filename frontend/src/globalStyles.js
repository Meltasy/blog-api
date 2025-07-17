import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --text-color: rgb(0, 25, 0);
    --background-color: rgb(223, 236, 223);
    --primary-color: rgb(45, 136, 45);
    --primary-color-light: rgb(122, 192, 122);
    --primary-color-dark: rgb(2, 80, 2);
    --secondary-color: rgb(170, 57, 57);
    --secondary-color-light: rgb(239, 153, 153);
    --secondary-color-dark: rgb(101, 3, 3);
  }
  
  body {
    font-family: 'Lucida Console', 'Courier New', Courier, monospace;
    font-size: 16px;
    color: var(--text-color);
    background-color: var(--background-color);
  }

  nav {
    font-weight: bold;
    color: var(--background-color);
    background-color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
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
    font-size: 2rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  form {
    background-color: var(--primary-color);
    width: max-content;
    margin: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }

  form div div {
    display: flex;
  }

  label {
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--background-color);
    margin-right: 1rem;
  }

  input {
    font-family: inherit;
    font-size: 1.2rem;
    color: var(--background-color);
    background-color: var(--primary-color-dark);
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    min-width: 400px;
  }

  .button {
    align-self: center;
  }

  button {
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--background-color);
    background-color: var(--primary-color-dark);
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
  }

  .errors {
    color: var(--secondary-color-dark);
    align-self: end;
    max-width: 425px;
  }
`

export default GlobalStyles
