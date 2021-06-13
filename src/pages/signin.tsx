import { FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Lottie from 'react-lottie'
import { SignInContainer } from '../styles/pages/SignIn'
import { Screen } from '../styles/global'
import { useSession } from '../hooks/useSession'
import Input from '../components/Input'
import { IsEmailValid } from '../utils/validation'
import ActivityAnimation from '../animations/activity.json'

const ActivityAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: ActivityAnimation
}

const SignIn = () => {
  const session = useSession()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [submited, setSubmited] = useState(false)

  useEffect(() => {
    console.log(session.hasSession)
    if (session.hasSession && !submited) {
      router.push('/users')
      toast.info('Você já está logado')
    }
  }, [session.hasSession])

  const validateForm = () => {
    if (!IsEmailValid(email)) return false
    if (password.length < 8) return false

    return true
  }

  const onSubmitSignInForm = async (e: FormEvent) => {
    e.preventDefault()
    setSubmited(true)

    const isFormValid = validateForm()

    setLoading(true)
    if (isFormValid) await session.SignIn(email, password)
    setLoading(false)
  }

  return (
    <Screen>
      <Head>
        <title>UserManager - entrar</title>
      </Head>
      <SignInContainer>
        <form onSubmit={onSubmitSignInForm}>
          <h1>Entrar</h1>
          <section>
            <Input
              placeholder="exemplo@email.com"
              value={email}
              error={submited && !IsEmailValid(email)}
              errorMessage={'Email inválido'}
              onChange={setEmail}
              label="Email"
              type="text"
            />
            <Input
              value={password}
              error={submited && password.length < 8}
              errorMessage={'Senha muito curta'}
              onChange={setPassword}
              label="Senha"
              type="password"
            />
          </section>
          <button disabled={loading} type="submit">
            {loading ? (
              <Lottie
                options={ActivityAnimationOptions}
                height={'1.8rem'}
                width={'1.8rem'}
                isStopped={false}
                isPaused={false}
                isClickToPauseDisabled={true}
              />
            ) : (
              'Entrar'
            )}
          </button>
          <footer>
            <p>&copy;2021 - UserManager</p>
          </footer>
        </form>
      </SignInContainer>
    </Screen>
  )
}

export default SignIn
