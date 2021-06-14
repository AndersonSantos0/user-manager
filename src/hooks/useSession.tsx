import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { UserType } from '../types/user'
import base64 from 'base-64'

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
      console.log('usuário encontrado')
      setHasSession(true)
      setUser(JSON.parse(userData))
      return
    }

    // localstorage user vazio
    console.log('usuário não encontrado')
    setHasSession(false)
  }, [])

  const SignIn = async (email: string, password: string) => {
    // buscar usuário correspondente
    await api
      .get('/users', {
        params: {
          email: email.toLowerCase(),
          password: base64.encode(password)
        }
      })
      .then(response => {
        // caso email e/ou senha não coincidirem com algum usuário cadastro
        if (response.data.length === 0)
          return toast.error('Usuário não encontrado')

        // deletar atributo password do objeto user
        const user: UserType = response.data[0]
        delete user.password

        // salvar usuário em localstorage
        localStorage.setItem('user', JSON.stringify(user))

        // salvar usuário em sessão
        // redirecionar para /users
        setUser(user)
        setHasSession(true)
        toast.success('Login realizado com sucesso')
        router.push('/users')
      })
      .catch(() => {
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
    return await api
      .get('/users', {
        params: {
          email: user.email.toLowerCase(),
          password: base64.encode(actualPassword)
        }
      })
      .then(response => {
        if (response.data.length === 0) {
          throw 'Senha atual incorreta'
        }

        return api
          .patch('/users/' + user.id, {
            password: base64.encode(newPassword)
          })
          .then(() => {
            toast.success('Senha alterada com sucesso')
            SignOut()
            return true
          })
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
