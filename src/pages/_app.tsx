import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Modal from 'react-modal'
import ThemeProvider from '../hooks/useTheme'
import AppContainer from '../components/AppContainer'
import SessionProvider from '../hooks/useSession'
import GlobalStyles, { LoadingBar } from '../styles/global'
import TopMenu from '../components/TopMenu'

import 'react-toastify/dist/ReactToastify.css'

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }) {
  const NoMenuRoutes = ['/signin']

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      // ao iniciar o evento de troca de tela, a barra de loading parece
      setLoading(true)
    }

    const handleRouteChanged = () => {
      // após ocorrer a troca de tela, a barra de loading desaparece
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChanged)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChanged)
    }
  }, [])

  return (
    <ThemeProvider>
      <SessionProvider>
        <AppContainer>
          <LoadingBar loading={loading ? 1 : 0} />
          {/* Verificar se a tela atual precisa que o menu seja renderizado */}
          {!NoMenuRoutes.includes(router.route) && <TopMenu />}
          <Component {...pageProps} />
        </AppContainer>
        <GlobalStyles />
      </SessionProvider>
    </ThemeProvider>
  )
}

export default MyApp
