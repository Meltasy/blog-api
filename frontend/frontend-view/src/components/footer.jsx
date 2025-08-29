import styled from 'styled-components'

const StyledFooter = styled.div`
  font-weight: 700;
  color: var(--primary-color-dark);
  background-color: rgb(255, 255, 255, 0.3);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.5rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`
 const StyledLink = styled.a`
  &:link {
    color: inherit;
    text-decoration: none;
  }
  &:hover,
  &:visited {
    color: var(--primary-color);
  }
`

function Footer() {
  return (
    <StyledFooter>
      <p>Copyright &copy; 2025 Melissa Vialaneix.</p>
      <p>All rights reserved.</p>
      <p>
        Photo by{' '} 
        <StyledLink href="https://unsplash.com/fr/@ranma?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Ran Ma
        </StyledLink>
        {' '}on{' '}
        <StyledLink href="https://unsplash.com/fr/photos/cite-interdite-jQItDhVbNSw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash.
        </StyledLink>
      </p>
    </StyledFooter>
  )
}

export default Footer