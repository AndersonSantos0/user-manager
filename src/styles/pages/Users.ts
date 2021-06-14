import styled from 'styled-components'

export const UsersScreenContainer = styled.div``

export const UsersScreenContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  gap: 3rem;

  section {
    flex: 1;
  }

  @media (max-width: 630px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const UsersContainer = styled.div`
  background-color: var(--container);
  border: 1px solid var(--borderColor);
  border-radius: 4px;
  padding: 1rem 2rem;

  header {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: #666;
    }

    a {
      color: #fff;
      background-color: var(--primary);
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      border-radius: 4px;
      text-decoration: none;
      gap: 1rem;
      transition: filter 0.2s, transform 0.2s;

      &:active {
        transform: scale(0.95);
      }

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  > form {
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;

    > p {
      font-size: 0.8rem;
      margin-top: 2rem;
      color: var(--accentColor);
    }

    section {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 1rem;
      flex-wrap: wrap;

      & + section {
        margin-top: 2rem;
      }

      &:last-child {
        margin-top: 3rem;

        label {
          color: #666;
        }
      }

      > div {
        flex: 1;
        display: flex;

        &.buttons {
          gap: 1rem;
          margin-left: auto;

          button:first-child {
            margin-left: auto;
          }

          @media (max-width: 640px) {
            button {
              flex: 1;
            }
          }
        }
      }

      > .switch {
        max-width: 56px;
      }

      button {
        background-color: var(--primary);
        position: relative;
        border: none;
        border-radius: 4px;
        height: 2.5rem;
        padding: 0 1.5rem;
        color: #fff;
        outline: none;
        transition: filter 0.2s;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        gap: 1rem;
        font-family: 'Poppins', sans-serif;

        &:disabled {
          cursor: default;

          &:hover {
            filter: none;
          }
        }

        &:hover {
          filter: brightness(0.8);
        }

        &.remove {
          background-color: var(--accentColor);
        }

        > svg {
          font-size: 1.1rem;
        }
      }

      @media (max-width: 640px) {
        flex-direction: column;
        width: 100%;
        gap: 2rem;

        &:last-child {
          flex-direction: row;

          > input {
            flex: 1;
          }
        }

        > div {
          width: 100%;
        }
      }
    }
  }

  footer {
    border-top: 1px solid var(--borderColor);
    padding: 1rem 0;
    padding-top: 2rem;

    p {
      color: #999;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 920px) {
    .TDoc {
      display: none;
    }
    .TBirth {
      text-align: right !important;
    }
  }

  @media (max-width: 820px) {
    .TBirth {
      display: none;
    }
    .TEmail {
      text-align: right;

      > p {
        margin-left: auto;
      }
    }
  }
`
