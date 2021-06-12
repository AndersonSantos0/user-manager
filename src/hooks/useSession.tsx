import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { UserType } from '../types/user'

const base64 = require('base-64')

interface SessionContextData {
  user?: UserType
  hasSession: boolean
  SignIn: (email: string, password: string) => void
  SignOut: () => void
  ChangePassword: (email: string, password: string) => Promise<boolean>
}

const SessionContext = createContext<SessionContextData>({} as SessionContextData )

export const useSession = () => useContext(SessionContext)

export const SessionProvider: React.FC = ({children}) =>{

  const router = useRouter()

  const [hasSession, setHasSession] = useState(false)
  const [user, setUser] = useState<UserType>({} as UserType)

  useEffect(()=>{
    //buscar usuário do localstorage
    const userData = localStorage.getItem('user')

    if (userData) {
      //salvar usuário em sessão
      console.log('usuário encontrado')
      setHasSession(true)
      setUser(JSON.parse(userData))
      return
    }

    //localstorage user vazio
    console.log('usuário não encontrado')
  },[])

  const SignIn = async (email: string, password: string) =>{
    //buscar usuário correspondente
    await api.get('/users',{
      params: {
        email,
        password: base64.encode(password),
      }
    }).then(response => {
      //caso email e/ou senha não coincidirem com algum usuário cadastro
      if(response.data.length === 0)return toast.error('Usuário não encontrado')

      //deletar atributo password do objeto user
      const user: UserType = response.data[0]
      delete user.password

      //salvar usuário em localstorage
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      )

      //salvar usuário em sessão
      //redirecionar para /users
      setUser(user)
      setHasSession(true)
      toast.success('Login realizado com sucesso')
      router.push('/users')
    })
  }

  const SignOut = () =>{
    //redirecionar para /signin
    router.push('/signin')
    //remove os dados do usuário salvos no localstorage
    localStorage.removeItem('user')
    //cancela a sessão
    setHasSession(false)
    //remove os dados do usuário da sessão
    setUser({} as UserType)
  }

  const ChangePassword = async (actualPassword: string, newPassword: string) => {
    return await api.get('/users',{
      params: {
        email: user.email,
        password: base64.encode(actualPassword)
      }
    }).then(response => {
      if(response.data.length === 0){
        throw "Senha atual incorreta"
      }

      return api.patch('/users/'+user.id,{
        password: base64.encode(newPassword)
      }).then(()=>{
        toast.success('Senha alterada com sucesso')
        return true
      })
    })
  }

  return(
    <SessionContext.Provider value={{
      user,
      hasSession,
      SignIn,
      SignOut,
      ChangePassword
    }} >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider