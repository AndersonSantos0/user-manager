import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { UserType } from '../types/user'
import { ChangePasswordAPI } from '../services/userAPI'
import { SignInAPI } from '../services/authAPI'

interface SessionContextData {
  user?: UserType
  hasSession: boolean
  SignIn: (email: string, password: string) => void
  SignOut: () => void
  ChangePassword: (email: string, password: string) => Promise<boolean>
}

const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData
)

export const useSession = () => useContext(SessionContext)

interface SessionProviderProps {
  children: React.ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const router = useRouter()

  const [hasSession, setHasSession] = useState<undefined | boolean>(undefined)
  const [user, setUser] = useState<UserType>({} as UserType)

  useEffect(() => {
    // buscar usuário do localstorage
    const userData = localStorage.getItem('user')

    if (userData) {
      // salvar usuário em sessão
      setHasSession(true)
      setUser(JSON.parse(userData))
      return
    }

    // localstorage user vazio
    setHasSession(false)
  }, [])

  const SignIn = async (email: string, password: string) => {
    await SignInAPI(email, password)
      .then(user => {
        // salvar usuário em localStorage
        localStorage.setItem('user', JSON.stringify(user))

        // salvar usuário em sessão
        // redirecionar para /users
        setUser(user)
        setHasSession(true)
        toast.info('Login realizado com sucesso')
        router.push('/users')
      })
      .catch(err => {
        if (err.message) return toast.error(err.message)
        toast.error(
          'Não foi possível fazer login agora, tente novamente mais tarde'
        )
      })
  }

  const SignOut = () => {
    // reseta a sessão
    setHasSession(false)
    // remove os dados do usuário salvos no localstorage
    localStorage.removeItem('user')
    // remove os dados do usuário da sessão
    setUser({} as UserType)
    // redirecionar para /signin
    router.push('/signin')
  }

  const ChangePassword = async (
    actualPassword: string,
    newPassword: string
  ) => {
    return ChangePasswordAPI(user.id, actualPassword, newPassword).then(() => {
      toast.info('Senha alterada com sucesso')
      SignOut()
      return true
    })
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        hasSession,
        SignIn,
        SignOut,
        ChangePassword
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default memo(SessionProvider)
