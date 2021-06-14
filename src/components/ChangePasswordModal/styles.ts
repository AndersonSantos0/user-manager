import styled from 'styled-components'

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
  }

  > p {
    margin-bottom: 1.5rem;
    color: var(--accentColor);
  }

  div {
    & + div {
      margin-top: 2rem;
    }
  }

  button[type='submit'] {
    width: 100%;
    height: 2.5rem;
    background-color: var(--primary);
    color: #fff;
    border-radius: 4px;
    border: 0;
    font-size: 1rem;
    margin-top: 2.5rem;
    cursor: pointer;
    outline: none;

    transition: filter 0.2s;

    &:disabled {
      cursor: default;

      &:hover {
        filter: none;
      }
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
`
