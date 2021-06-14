import styled from 'styled-components'

export const UserContainer = styled.div`
  flex: 1;
`

export const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserProfileContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: 0;

  > div {
    display: flex;
    flex-direction: column;

    h1 {
      color: #333;
      font-weight: 500;
      font-size: 1.5rem;
      line-height: 1.5rem;
      margin-bottom: 0.25rem;
    }

    h2 {
      color: var(--primary);
      font-weight: 100;
      font-size: 1rem;
    }
  }
`

interface UserProfilePhotoProps {
  image: string
}

export const UserProfilePhoto = styled.div<UserProfilePhotoProps>`
  width: 6rem;
  aspect-ratio: 1/1;
  border-radius: 3rem;
  border: 1px solid var(--borderColor);
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const UserContentContainer = styled.div`
  width: 100%;
  display: flex;
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem;
  gap: 3rem;

  section {
    flex: 1;
    background: var(--container);
    border-radius: 4px;
    border: 1px solid var(--borderColor);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0;
  }
`

export const UserContent = styled.div`
  width: 100%;
  padding: 1rem;
  padding-bottom: 0;

  table {
    width: 100%;
    border-spacing: 0;

    tbody {
      tr {
        display: flex;

        td {
          flex: 1;
          padding: 1rem;
          border: none;
          border-top: 1px solid var(--borderColor);
          color: #333;
          position: relative;

          > p {
            overflow-x: hidden;
            text-overflow: ellipsis;
            max-width: 24rem;
            margin-left: auto;
          }

          &:first-child {
            color: #666;
            font-weight: 500;
            font-size: 1.1rem;
          }

          &:last-child {
            color: #333;
            text-align: right;
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  footer {
    padding: 2rem 0;
    padding-top: 4rem;
    text-align: center;
  }
`

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid var(--borderColor);
  padding-top: 1rem;
  margin-bottom: 1rem;

  button {
    height: 2.5rem;
    border-radius: 4px;
    border: none;
    color: #fff;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    font-family: 'Poppins', sans-serif;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: flex;
    gap: 0.5rem;
    transition: filter 0.4s;

    &.edit {
      background-color: var(--primary);
    }

    &.remove {
      background-color: var(--accentColor);
    }

    > svg {
      font-size: 1.1rem;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }

  @media (max-width: 640px) {
    > button {
      flex: 1;
    }
  }
`
