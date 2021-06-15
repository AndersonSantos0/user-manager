import styled from 'styled-components'

export const TopMenuContainer = styled.div`
  width: 100%;
  height: 6rem;
`

export const TopMenuContent = styled.div`
  max-width: 1120px;
  padding: 0 1rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;

    > svg {
      cursor: pointer;
    }
  }
`

export const SearchInputContainer = styled.form`
  display: flex;
  height: 2.5rem;
  margin-left: 8rem;

  > input {
    border: 1px solid var(--borderColor);
    border-right-color: transparent;
    background-color: var(--container);
    border-radius: 1.25rem 0 0 1.25rem;
    height: 2.5rem;
    outline: none;
    padding: 0 0.5rem;
    padding-left: 1rem;
    color: var(--text);
    transition: background-color 0.4s, border-color 0.4s, color 0.4s;

    ::placeholder {
      color: var(--description);
    }
  }

  > button {
    width: 3rem;
    height: 2.5rem;
    padding-right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--borderColor);
    border-left: none;
    background-color: var(--container);
    color: var(--text);
    border-radius: 0 1.25rem 1.25rem 0;
    outline: none;
    cursor: pointer;
    margin-right: 1rem;
    transition: background-color 0.4s, border-color 0.4s, color 0.4s;

    &:active {
      filter: brightness(1.1);
    }
  }

  @media (max-width: 630px) {
    margin-left: 1rem;
  }
`
