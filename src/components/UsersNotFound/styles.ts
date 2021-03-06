import styled from 'styled-components'

export const UsersNotFoundContainer = styled.div`
  height: 20rem;
  width: 100%;
  border-top: 1px solid var(--borderColor);
  transition: border-color 0.4s;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  h1 {
    text-align: center;
    color: var(--text-title);
    transition: color 0.4s;
  }

  svg {
    opacity: 0.8;
  }
`
