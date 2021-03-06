import styled, { css } from 'styled-components'

interface InputContainerProps {
  hasIcon?: boolean
  error?: boolean
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  > div {
    width: 100%;
    position: relative;

    input {
      border-radius: 4px;
      font-size: 1rem;
      color: var(--text);
      border: 1px solid
        ${props =>
          props.error ? 'var(--accentColor) !important' : 'var(--borderColor)'};
      padding: 0 0.75rem;
      height: 2.5rem;
      outline: none;
      width: 100%;
      font-family: 'Poppins', sans-serif;
      background-color: var(--background);
      transition: background-color 0.4s, border-color 0.4s, color 0.4s;

      ::placeholder {
        color: var(--placeholder);
      }

      &:focus {
        border-color: var(--primary);
      }

      ${props =>
        props.hasIcon &&
        css`
          padding-right: 2.25rem;
        `}
    }

    input[type='button'] {
      background-color: var(--primary);
      transition: transform 0.2s;
      cursor: pointer;

      &:active {
        background-color: var(--secondary);
        transform: scale(0.95);
      }
    }
  }
`

export const InputLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 4px;
  color: var(--text-title);
  transition: color 0.4s;
`

export const InputIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--description);
  transition: color 0.4s;
  right: 0;
  bottom: 0;
  cursor: pointer;
  height: 2.5rem;
  aspect-ratio: 1/1;
`

export const InputFeedBack = styled.p`
  color: var(--accentColor);
  font-size: 0.8rem;
  position: absolute;
  bottom: -1.4rem;
  left: 0;
`
