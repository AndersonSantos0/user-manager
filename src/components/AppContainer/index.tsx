import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
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

  // caso sessão carregando
  if (session.hasSession === undefined) return <AppContainerElement />

  // caso usuário esteja em uma tela na qual não tem permissão de acessar
  if (
    (!session.hasSession && router.route !== '/signin') ||
    (session.hasSession &&
      session.user.role !== 'ADMIN' &&
      adminOnlyRoutes.includes(router.route))
  )
    return (
      <AppContainerElement>
        <ToastContainer autoClose={3000} position="top-right" />
        <NoAccess hasSession={session.hasSession} />
      </AppContainerElement>
    )

  return (
    <AppContainerElement>
      <ToastContainer autoClose={3000} position="top-right" />
      {children}
    </AppContainerElement>
  )
}

export default memo(AppContainer)
