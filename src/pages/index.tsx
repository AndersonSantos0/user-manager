import Head from 'next/head'
import AsideMenu from '../components/AsideMenu'
import BlankDashboard from '../components/BlankDashboard'
import { Screen } from '../styles/global'
import {
  DashboardScreenContainer,
  DashboardContainer,
  DashboardContent
} from '../styles/pages/Dashboard'

const Dashboard = () => {
  return (
    <Screen>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardScreenContainer>
        <DashboardContainer>
          <AsideMenu />
          <DashboardContent>
            <BlankDashboard />
          </DashboardContent>
        </DashboardContainer>
      </DashboardScreenContainer>
    </Screen>
  )
}

export default Dashboard
