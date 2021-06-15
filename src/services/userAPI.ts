import { UserType } from '../types/user'
import { api } from './api'
import base64 from 'base-64'

interface CreateUserAPIArgs extends Omit<UserType, 'document' | 'id'> {
  document: string
}

export const CreateUserAPI = async ({
  firstName,
  lastName,
  birthDate,
  document,
  email,
  password,
  role
}: CreateUserAPIArgs) => {
  return await api.post('/users', {
    firstName,
    lastName,
    birthDate,
    email: email.toLowerCase(),
    document: String(document).replace(/[^\d]+/g, ''),
    password: base64.encode(password),
    role
  })
}

export const RemoveUserAPI = async (id: number) => {
  return await api.delete('/users/' + id)
}

export const ChangePasswordAPI = async (
  id: number,
  actualPassword: string,
  newPassword: string
) => {
  const isActualPasswordCorrect = await api
    .get('/users', {
      params: {
        id,
        password: base64.encode(actualPassword)
      }
    })
    .then(response => {
      if (response.data.length === 0) {
        return false
      } else {
        return true
      }
    })

  if (!isActualPasswordCorrect) throw { message: 'Senha atual incorreta' }

  return await api.patch('/users/' + id, {
    password: base64.encode(newPassword)
  })
}

interface EditUserAPIArgs extends Omit<UserType, 'document'> {
  document: string
}

export const EditUserAPI = async ({
  id,
  firstName,
  lastName,
  birthDate,
  email,
  document,
  password,
  role
}: EditUserAPIArgs) => {
  return api.patch('/users/' + id, {
    firstName,
    lastName,
    birthDate,
    email: email.toLowerCase(),
    document: document.replace(/[^\d]+/g, ''),
    password: base64.encode(password),
    role
  })
}
