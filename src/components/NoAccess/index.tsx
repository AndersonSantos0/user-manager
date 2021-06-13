import { useEffect, useState } from 'react'
import Head from 'next/head'
import Lottie from 'react-lottie'
import { NoAccessContainer } from './styles'
import NoAccessAnimation from '../../animations/no_access.json'
import { useRouter } from 'next/router'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: NoAccessAnimation
}

interface NoAccessProps {
  redirect?: boolean
  hasSession?: boolean
}

const NoAccess = ({ redirect = true, hasSession }: NoAccessProps) => {
  const router = useRouter()

  const [seconds, setSeconds] = useState(5)

  const _redirect = () => {
    if (!hasSession) {
      router.push('/signin')
    }
    if (hasSession) {
      router.push('/users')
    }
  }

  useEffect(() => {
    const decrementSeconds = () => {
      setSeconds(prev => (prev - 1 < 0 ? 0 : prev - 1))
    }

    const intervalTimer = redirect && setInterval(decrementSeconds, 1000)
    const redirectTimer = redirect && setTimeout(_redirect, seconds * 1000)

    return () => {
      clearInterval(intervalTimer)
      clearTimeout(redirectTimer)
    }
  }, [hasSession])

  return (
    <NoAccessContainer>
      <Head>
        <title>Sem Permissão</title>
      </Head>
      <Lottie
        options={defaultOptions}
        height={'100%'}
        width={'100%'}
        style={{ maxWidth: 400, maxHeight: 400 }}
        isStopped={false}
        isPaused={false}
        isClickToPauseDisabled={true}
      />
      <h1>Você não tem permissão para acessar essa tela</h1>
      {redirect && <h2>Você será redirecionado em {seconds} segundos...</h2>}
    </NoAccessContainer>
  )
}

export default NoAccess
