import styled from 'styled-components'

export const PaginationIndexContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    background-color: transparent;
    border: 1px solid var(--primary);
    width: 1.5rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: var(--primary);
    cursor: pointer;
    text-decoration: none;
    font-family: Poppins, sans-serif;
    font-size: 1rem;
    outline: none;

    &.active {
      background-color: var(--primary);
      border: none;
      color: #fff;
    }
  }
`
