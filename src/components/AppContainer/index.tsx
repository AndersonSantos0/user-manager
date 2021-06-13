import React, { memo } from 'react'
import { useRouter } from 'next/router'
import NoAccess from '../NoAccess'
import { useSession } from '../../hooks/useSession'
import { AppContainerElement } from './styles'

interface AppContainerProps {
  children: React.ReactNode
}

const AppContainer = ({ children }: AppContainerProps) => {
  const session = useSession()
  const router = useRouter()

  const adminOnlyRoutes = ['/users/create']

  if (session.hasSession === undefined) return <AppContainerElement />
  if (
    (!session.hasSession && router.route !== '/signin') ||
    (session.hasSession &&
      session.user.role !== 'ADMIN' &&
      adminOnlyRoutes.includes(router.route))
  )
    return (
      <AppContainerElement>
        <NoAccess hasSession={session.hasSession} />
      </AppContainerElement>
    )

  return <AppContainerElement>{children}</AppContainerElement>
}

export default memo(AppContainer)
