import Head from 'next/head'
import Lottie from 'react-lottie'
import { NotFoundContainer } from '../styles/pages/404'
import NotFoundAnimation from '../animations/404.json'
import { useRouter } from 'next/router'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: NotFoundAnimation,
}

const NotFound = () =>{

  const router = useRouter()

  return(
    <NotFoundContainer>
      <Head>
        <title>Pagina não encontrada</title>
      </Head>
      <Lottie
        options={defaultOptions}
        height={'100%'}
        width={'100%'}
        style={{ maxWidth: 400, maxHeight: 300 }}
        isStopped={false}
        isPaused={false}
        isClickToPauseDisabled={true}
      />
      <h1>Oops</h1>
      <h2>Esse caminho parece meio vazio, precisamos <span onClick={()=>router.push('/users')}>voltar</span></h2>
    </NotFoundContainer>
  )
}

export default NotFound