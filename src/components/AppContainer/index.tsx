import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import NoAccess from '../NoAccess'
import { useSession } from '../../hooks/useSession'
import { AppContainerElement } from './styles'

const AppContainer: React.FC = ({ children }) => {
  const session = useSession()
  const router = useRouter()

  const adminOnlyRoutes = ['/users/create']

  useEffect(() => {
    console.log(session.hasSession)
  }, [session.hasSession])

  if (
    (!session.hasSession && router.route !== '/signin') ||
    (session.hasSession &&
      session.user.role !== 'ADMIN' &&
      adminOnlyRoutes.includes(router.route))
  )
    return (
      <AppContainerElement>
        <ToastContainer autoClose={3000} position="top-center" />
        <NoAccess hasSession={session.hasSession} />
      </AppContainerElement>
    )

  return (
    <AppContainerElement>
      <ToastContainer autoClose={3000} position="top-center" />
      {children}
    </AppContainerElement>
  )
}

export default AppContainer
