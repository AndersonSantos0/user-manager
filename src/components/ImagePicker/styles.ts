import styled from 'styled-components'

interface ImagePickerContainerProps {
  image: string
}

export const ImagePickerContainer = styled.div<ImagePickerContainerProps>`
  max-width: 8rem;
  max-height: 8rem;
  min-width: 8rem;
  min-height: 8rem;
  margin-top: auto;
  margin-right: 1rem;
  border-radius: 4rem;
  border: 1px solid var(--borderColor);
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  > input {
    appearance: none;
    -webkit-appearance: none;
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1;
    backdrop-filter: blur(8px);
    opacity: 0;
    transition: opacity 0.4s;
  }

  > svg {
    font-size: 2rem;
    position: relative;
    color: #fff;
    z-index: 3;
    cursor: pointer;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    > svg {
      opacity: 1;
    }

    &::after {
      opacity: 1;
    }
  }
`
