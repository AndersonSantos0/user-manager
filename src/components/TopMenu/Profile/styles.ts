import styled from 'styled-components'

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`

export const ProfileUserContainer = styled.div`
  border-radius: 0.75rem;
  padding: 0 1rem;
  margin-right: 0.5rem;
  align-items: center;
  display: flex;

  > div {
    cursor: pointer;

    > h1 {
      font-size: 1rem;
      line-height: 1rem;
      text-align: right;
      color: var(--text);
    }

    > p {
      font-size: 0.8rem;
      text-align: right;
      color: var(--description);
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 18vw;

      @media (max-width: 710px) {
        display: none;
      }
    }
  }

  @media (max-width: 530px) {
    display: none;
  }
`

interface ProfileImageContainerProps {
  image: string
}

export const ProfileImageContainer = styled.div<ProfileImageContainerProps>`
  min-width: 2.5rem;
  min-height: 2.5rem;
  border: 1px solid var(--borderColor);
  border-radius: 1.175rem;
  background-position: center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.image});
  cursor: pointer;
`

export const ProfileLogoutContainer = styled.div`
  min-width: 2.5rem;
  padding: 0 1rem;
  margin-left: 1rem;
  border-left: 1px solid var(--borderColor);
  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    aspect-ratio: 1/1;
    height: 1.5rem;
    border-radius: 4px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    cursor: pointer;

    > svg {
      color: var(--accentColor);
      font-size: 1rem;
      transform: rotateY(180deg);
    }
  }
`
