import styled from 'styled-components'

export const AsideMenuContainer = styled.aside`
  > h1 {
    text-transform: uppercase;
    font-size: 1rem;
    color: var(--description);
    transition: color 0.4s;
    margin-top: 1rem;

    &:first-child {
      margin-top: 0;
    }
  }

  > ul {
    list-style-type: none;
    font-size: 1rem;
    padding: 0.5rem 0;
    width: 8rem;

    > li {
      padding: 0.25rem 0;

      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text);
        text-decoration: none;
        cursor: pointer;
        transition: color 0.4s;
      }

      &.active {
        a {
          color: var(--primary);
        }
      }
    }

    @media (max-width: 630px) {
      display: flex;
      gap: 1rem;

      > li {
        padding: 0.5rem 0;
      }
    }
  }
`
