import Head from 'next/head'
import Lottie from 'react-lottie-player'
import { NotFoundContainer } from '../styles/pages/404'
import NotFoundAnimation from '../animations/404.json'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()

  return (
    <NotFoundContainer>
      <Head>
        <title>Pagina não encontrada</title>
      </Head>
      <Lottie
        loop
        animationData={NotFoundAnimation}
        play
        style={{ width: '100%', height: '100%', maxWidth: 400, maxHeight: 300 }}
      />
      <h1>Oops</h1>
      <h2>
        Esse caminho parece meio vazio, precisamos{' '}
        <span onClick={() => router.push('/')}>voltar</span>
      </h2>
    </NotFoundContainer>
  )
}

export default NotFound
