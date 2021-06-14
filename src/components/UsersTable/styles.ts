import styled from 'styled-components'

export const UsersTableContainer = styled.table`
  width: 100%;
  border-spacing: 0;

  .TBirth {
    text-align: center;
  }

  .TDoc {
    text-align: right;
  }

  th {
    color: #999;
    font-weight: 500;
    padding: 1rem;
    text-align: left;
    line-height: 1.5rem;
  }

  td {
    padding: 1rem;
    border: none;
    border-top: 1px solid var(--borderColor);
    background-color: var(--container);
    color: #333;
    position: relative;

    > p {
      overflow-x: hidden;
      text-overflow: ellipsis;
      max-width: 15.5rem;
    }
  }

  tbody {
    tr {
      cursor: pointer;

      &:hover {
        filter: brightness(0.95);
      }
    }
  }
`
