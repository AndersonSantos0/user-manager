import styled, { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  :root{
    --primary: ${props => props.theme.colors.primaryColor};
    --secondary: ${props => props.theme.colors.secondaryColor};
    --background: ${props => props.theme.colors.background};
    --container: ${props => props.theme.colors.container};
    --accentColor: ${props => props.theme.colors.accentColor};
    --borderColor: ${props => props.theme.colors.borderColor};
    --text-title: ${props => props.theme.colors.textTitle};
    --text: ${props => props.theme.colors.text};
    --description: ${props => props.theme.colors.description};
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    font-family: 'Poppins', 'Roboto' ,-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  background-color: var(--background);
  height: 100%;

    #__next{
      height: 100%;
    }
  }

  html {
    font-size: 100%;
    height: 100%;
    width: 100%;

    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
        font-size: 87.5%;
    }
  }

  .react-modal-overlay{
    background-color: rgba(0,0,0,.5);
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .react-modal-content{
    background-color: var(--background);
    width: 100%;
    max-width: 576px;
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
    outline: none;
  }

  .react-modal-close{
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: none;
    background-color: transparent;
    color: #999;
    cursor: pointer;
    transition: filter .2s;

    &:hover{
        filter: brightness(0.9);
    }
  }
`

export const Screen = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    transition: 0.2s;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #44444444;
  }
`

interface LoadingBarProps {
  loading: boolean | number
}

export const LoadingBar = styled.div<LoadingBarProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  top: ${props => (props.loading ? 0 : -4)}px;
  right: 0;
  z-index: 2;
  background-color: var(--primary);
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    width: 128px;
    height: 2px;
    left: 0;
    top: 0;
    background: var(--secondary);
    ${props =>
      props.loading &&
      css`
        animation: routeLoading 2s infinite;
      `}
  }

  @keyframes routeLoading {
    0% {
      left: 0;
    }
    50% {
      left: calc(100% - 128px);
    }
    100% {
      left: 0;
    }
  }
`
