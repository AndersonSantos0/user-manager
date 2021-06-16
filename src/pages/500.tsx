import Head from 'next/head'
import Lottie from 'react-lottie-player'
import { InternalServerErrorContainer } from '../styles/pages/500'
import InternalServerErrorAnimation from '../animations/500.json'

const InternalServerError = () => {
  return (
    <InternalServerErrorContainer>
      <Head>
        <title>Problema interno</title>
      </Head>
      <Lottie
        loop={false}
        animationData={InternalServerErrorAnimation}
        play
        style={{ width: '100%', height: '100%', maxWidth: 400, maxHeight: 400 }}
      />
      <h1>Oops</h1>
      <h2>
        Encontramos alguns problemas com o servidor, tente novamente mais tarde
      </h2>
    </InternalServerErrorContainer>
  )
}

export default InternalServerError
