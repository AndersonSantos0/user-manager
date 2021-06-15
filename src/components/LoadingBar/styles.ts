import styled, { css } from 'styled-components'

interface LoadingBarProps {
  loading?: boolean
}

export const LoadingBarElement = styled.div<LoadingBarProps>`
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
