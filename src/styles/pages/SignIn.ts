import styled from 'styled-components'

export const SignInContainer = styled.div`
  background: var(--background); //linear-gradient(235deg, var(--primary), var(--secondary));
  flex: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;

  > form{
    display: flex;
    flex-direction: column;
    background-color: var(--container);
    padding: 2rem 2rem 1rem 2rem;
    border-radius: 4px;
    border: 1px solid var(--borderColor);

    > svg{
      align-self: center;
      margin-bottom: 2rem;
    }

    h1{
      color: #333;
      margin-bottom: 1rem;
    }

    > section{
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      gap: 1.5rem;
      min-width: 350px;
    }

    button[type="submit"]{
      background-color: var(--primary);
      color: #fff;
      border: none;
      height: 2.5rem;
      border-radius: 4px;
      margin-top: 1rem;
      outline: none;
      transition: filter .1s;
      cursor: pointer;

      &:active{
        filter: brightness(.8);
      }

      &:disabled{
        cursor: default;
        
        &:active{
          filter: none;
        }
      }
    }

    > footer{
      margin-top: 2rem;
      text-align: center;
      color: #999;
      font-size: .8rem;
    }

    @media (max-width:480px){
      flex: 1;
      width: 100%;
      justify-content: center;
    }
  }
`