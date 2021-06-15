import styled from 'styled-components'

export const NoAccessContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;

  svg {
    opacity: 0.8;
  }

  h1 {
    color: var(--description);
    font-weight: 400;
  }

  h2 {
    color: var(--primary);
    font-weight: 100;
  }
`
