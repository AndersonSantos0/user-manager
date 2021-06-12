import styled from 'styled-components'

export const AsideMenuContainer = styled.aside`
  > h1 {
    text-transform: uppercase;
    font-size: 1rem;
    color: #999;
  }

  > ul{
    list-style-type: none;
    font-size: 1rem;
    padding: .5rem 0;
    width: 8rem;

    > li{
      padding: .25rem 0;

      a{
        display: flex;
        align-items: center;
        gap: .5rem;
        color: #333;
        text-decoration: none;
      }

      &.active{
        a{
          color: var(--primary)
        }
      }

      @media (max-width: 630px){
        padding: .5rem 0;
      }
    }
  }
`