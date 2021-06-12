import styled from 'styled-components'

export const HomeContainer = styled.div`
`

export const HomeContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  gap: 3rem;

  section{
    flex: 1;
  }

  @media (max-width: 630px){
    flex-direction: column;
    gap: .5rem;
  }
`

export const UsersContainer = styled.div`
  background-color: var(--container);
  border: 1px solid var(--borderColor);
  border-radius: 4px;
  padding: 1rem 2rem;

  header{
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
      color: #666;
    }
    
    a{
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
      transition: filter .2s, transform .2s;

      &:active{
        transform: scale(0.95);
      }

      &:hover{
        filter: brightness(.9);
      }
    }
  }

  > form{
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;

    section{
      display: flex;
      align-items: center;
      flex: 1;
      gap: 1rem;

      & + section{
        margin-top: 2rem;
      }

      &:last-child{
        margin-top: 3rem;

        label{
          color: #666;
        }
      }

      > div {
        flex: 1;
      }

      > .switch{
        max-width: 56px
      }

      input[type="reset"], input[type="submit"]{
        border: none;
        border-radius: 4px;
        height: 2.5rem;
        padding: 0 3rem;
        color: #fff;
        outline: none;
        transition: filter .2s;
        cursor: pointer;

        &:hover{
          filter: brightness(.8)
        }

        &:first-child{
          margin-left: auto;
        }

        &[type="reset"]{
          background-color: var(--accentColor);
        }

        &[type="submit"]{
          background-color: var(--primary);
        }
      }

      @media (max-width: 640px){
        flex-direction: column;
        width: 100%;

        &:last-child{
          flex-direction: row;

          >input{
            flex: 1;
          }
        }

        > div{
          width: 100%;
        }
      }
    }
  }

  footer{
    border-top: 1px solid var(--borderColor);
    padding: 1rem 0;
    padding-top: 2rem;

    p{
      color: #999;
      font-size: .8rem;
    }
  }

  @media (max-width: 920px){
    .TDoc{
      display: none;
    }
    .TBirth{
      text-align: right !important;
    }
  }

  @media (max-width: 820px){
    .TBirth{
      display: none;
    }
    .TEmail{
      text-align: right;
    }
  }
`