import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;

  h1{
    font-weight: 400;
    text-align: center;
  }

  h2{
    font-weight: 100;
    text-align: center;

    span{
      color: var(--primary);
      text-decoration: underline;
      cursor: pointer;
    }
  }
`