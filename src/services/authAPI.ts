import { api } from './api'
import base64 from 'base-64'
import { UserType } from '../types/user'

export const SignInAPI = async (email: string, password: string) => {
  return await api
    .get('/users', {
      params: {
        email: email.toLowerCase(),
        password: base64.encode(password)
      }
    })
    .then(response => {
      if (response.data.length === 0)
        throw { message: 'Usuário não encontrado' }

      const user: UserType = response.data[0]
      delete user.password

      return user
    })
}
