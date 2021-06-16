export type UserType = {
  id: number
  image?: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  document: number | string
  password: string
  role: 'ADMIN' | 'USER'
}
