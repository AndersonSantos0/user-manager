import styled from 'styled-components'

export const Container = styled.div`
  h2 {
    color: #666;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 500;

    > span {
      color: var(--primary);
      font-weight: 500;
    }
  }

  div {
    display: flex;
    gap: 2rem;

    button {
      width: 100%;
      padding: 0 1.5rem;
      height: 2.5rem;
      background-color: var(--primary);
      color: #fff;
      border-radius: 4px;
      border: 0;
      font-size: 1rem;
      margin-top: 2rem;
      cursor: pointer;
      outline: none;

      transition: filter 0.2s;

      &.signout {
        background-color: var(--accentColor);
      }

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`
