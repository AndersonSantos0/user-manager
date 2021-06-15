import moment from 'moment'
import { api } from '../services/api'
import { UserType } from '../types/user'

export const isEmailValid = (email: string): boolean => {
  const reg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  // verificar formato do email
  return reg.test(email)
}

export const isEmailUsed = async (email: string): Promise<boolean> => {
  // verificar se já possui cadastro com esse email
  const response = await api.get('/users/', {
    params: {
      email
    }
  })

  return response.data.length > 0
}

export const isDocumentUsed = async (document: number): Promise<boolean> => {
  // verificar se já possui cadastro com esse documento
  const response = await api.get('/users/', {
    params: {
      document
    }
  })

  return response.data.length > 0
}

export const isDbUserFree = async (email: string, document: number) => {
  const emailAlreadyTaken = isEmailUsed(email)
  const documentAlreadyTaken = isDocumentUsed(document)

  // verificar se ja possui cadastro com esse email ou documento

  const test = await Promise.all([emailAlreadyTaken, documentAlreadyTaken])

  return test
}

export const isBirthDateValid = (dateString: string): boolean => {
  const reg = /[0-9]{2}-[0-9]{2}-[0-9]{4}/g

  // Verificar se a data esta no formato correto "00-00-0000"
  if (!reg.test(dateString)) return false

  // Verificar se a data é valida conforme o calendário
  if (moment(dateString, 'DD-MM-YYYY').format() === 'Invalid date') return false

  // Limitar a data ao momento atual
  if (
    new Date(moment(dateString, 'DD-MM-YYYY').format()).getTime() >
    new Date().getTime()
  )
    return false

  return true
}

export const isDocumentValid = (cpf: string): boolean => {
  const reg = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g

  cpf = cpf.replace(/[^\d]+/g, '')

  // Elimina CPFs invalidos conhecidos
  if (cpf.match(reg)) return false

  // Valida o 1º digito
  let add = 0

  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)

  let rev = 11 - (add % 11)

  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(9))) return false

  // Valida o 2º digito
  add = 0
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (add % 11)

  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(10))) return false

  return true
}

interface ValidateFormDataArgs
  extends Omit<UserType, 'id' | 'document' | 'role'> {
  document: string
}

interface ValidateFormUserArgs {
  userEmail: string
  userDocument: string | number
}

const DOC_ALREADY_EXIST_OBJ = {
  error: 'DOC_ALREADY_EXIST',
  message: 'Documento já cadastrado'
}

const EMAIL_ALREADY_EXIST_OBJ = {
  error: 'EMAIL_ALREADY_EXIST',
  message: 'Email já cadastrado'
}

export const validateForm = async (
  {
    firstName,
    lastName,
    birthDate,
    document,
    email,
    password
  }: ValidateFormDataArgs,
  user?: ValidateFormUserArgs
) => {
  const formatedDocument = Number(document.replace(/[^\d]+/g, ''))
  const formatedEmail = email.toLowerCase()

  if (firstName.length < 2) return false
  if (lastName.length < 2) return false
  if (!isBirthDateValid(birthDate)) return false
  if (!isDocumentValid(document)) return false
  if (!isEmailValid(formatedEmail)) return false
  if (password.length < 8) return false

  const [isEmailAlreadyTaken, isDocumentAlreadyTaken] = await isDbUserFree(
    formatedEmail,
    formatedDocument
  )

  if (user) {
    if (!user.userEmail || !user.userDocument)
      throw { message: 'usuário inválido' }

    const userEmail = user.userEmail
    const userDocument = Number(user.userDocument)

    if (isDocumentAlreadyTaken && formatedDocument !== userDocument)
      throw DOC_ALREADY_EXIST_OBJ

    if (isEmailAlreadyTaken && formatedEmail !== userEmail)
      throw EMAIL_ALREADY_EXIST_OBJ
  }

  if (isDocumentAlreadyTaken && !user) throw DOC_ALREADY_EXIST_OBJ
  if (isEmailAlreadyTaken && !user) throw EMAIL_ALREADY_EXIST_OBJ

  return true
}
