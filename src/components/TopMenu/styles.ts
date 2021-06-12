import styled from 'styled-components'

export const TopMenuContainer = styled.div`
  width: 100%;
  height: 6rem;
  //background-color: var(--container);
  //border-bottom: 1px solid var(--borderColor);
`

export const TopMenuContent = styled.div`
  max-width: 1120px;
  padding: 0 1rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div{
    display: flex;
    align-items: center;

    > svg{
      cursor: pointer;
    }
  }  
`

export const SearchInputContainer = styled.form`
  display: flex;
  height: 2.5rem;
  margin-left: 8rem;

  > input{
    border: 1px solid var(--borderColor);
    border-right-color: transparent;
    border-radius: 1.25rem 0 0 1.25rem;
    height: 2.5rem;
    outline: none;
    padding: 0 .5rem;
    padding-left: 1rem;
    color: #333;
  }

  > button{
    width: 3rem;
    height: 2.5rem;
    padding-right: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--borderColor);
    border-left: none;
    background-color: var(--container);
    color: #333;
    border-radius: 0 1.25rem 1.25rem 0;
    outline: none;
    cursor: pointer;
    margin-right: 1rem;

    &:active{
      filter: brightness(1.1)
    }
  }

  @media (max-width: 630px){
    margin-left: 1rem ;
  }
`