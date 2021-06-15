import styled from 'styled-components'

export const DashboardScreenContainer = styled.div`
  flex: 1;
`

export const DashboardContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  gap: 3rem;

  @media (max-width: 630px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const DashboardContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: dashed 1px var(--description);
  transition: border-color 0.4s;
  border-radius: 4px;
`
