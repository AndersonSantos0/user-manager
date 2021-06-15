import styled from 'styled-components'

export const BlankDashboardContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  h1 {
    text-align: center;
    color: var(--text-title);
    transition: color 0.4s;
  }

  svg {
    filter: brightness(0.95);
  }
`
