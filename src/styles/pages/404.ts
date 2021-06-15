import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  padding-bottom: 8rem;

  > div {
    margin-bottom: -3rem !important;

    svg {
      opacity: 0.8;
    }
  }

  h1 {
    font-weight: 400;
    text-align: center;
    color: var(--text-title);
  }

  h2 {
    font-weight: 100;
    text-align: center;
    color: var(--description);

    span {
      color: var(--primary);
      text-decoration: underline;
      cursor: pointer;
    }
  }
`
