/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import base64 from 'base-64'
import { useSession } from '../../hooks/useSession'
import Profile, { getServerSideProps } from '../../pages/users/profile/[id]'
import { api } from '../../services/api'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        route: '/'
      }
    }
  }
})

jest.mock('../../hooks/useSession')
jest.mock('../../services/api')

describe('User profile page', () => {
  it('Renders correctly when profile user are diferent of session user (as USER account)', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValue({
      hasSession: true,
      user: {
        id: 5,
        firstName: 'Tiago',
        lastName: 'Márcio',
        birthDate: '07-05-1954',
        email: 'tiagomarcioalves@vemter.com',
        document: '49657903831',
        password: 'MTIzNDU2',
        role: 'USER'
      }
    } as any)

    render(
      <Profile
        status={200}
        user={{
          id: 4,
          firstName: 'Sophia',
          lastName: 'Gabrielly',
          birthDate: '17-05-1962',
          email: 'sophiagabriellydapaz@eton.com',
          document: '55755895872',
          password: '*******',
          role: 'USER'
        }}
      />
    )

    expect(screen.getByText('Sophia Gabrielly')).toBeInTheDocument()
  })

  it('Renders correctly when profile user are same of session user (as USER account)', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      hasSession: true,
      user: {
        id: 5,
        firstName: 'Tiago',
        lastName: 'Márcio',
        birthDate: '07-05-1954',
        email: 'tiagomarcioalves@vemter.com',
        document: '49657903831',
        password: 'MTIzNDU2',
        role: 'USER'
      }
    } as any)

    render(
      <Profile
        status={200}
        user={{
          id: 5,
          firstName: 'Tiago',
          lastName: 'Márcio',
          birthDate: '07-05-1954',
          email: 'tiagomarcioalves@vemter.com',
          document: '49657903831',
          password: 'MTIzNDU2',
          role: 'USER'
        }}
      />
    )

    expect(screen.getByText('Tiago Márcio')).toBeInTheDocument()
    expect(screen.getByText('Alterar senha')).toBeInTheDocument()
  })

  it('Renders correctly when user session role is ADMIN', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      hasSession: true,
      user: {
        id: 5,
        firstName: 'Tiago',
        lastName: 'Márcio',
        birthDate: '07-05-1954',
        email: 'tiagomarcioalves@vemter.com',
        document: '49657903831',
        password: 'MTIzNDU2',
        role: 'ADMIN'
      }
    } as any)

    render(
      <Profile
        status={200}
        user={{
          id: 4,
          firstName: 'Sophia',
          lastName: 'Gabrielly',
          birthDate: '17-05-1962',
          email: 'sophiagabriellydapaz@eton.com',
          document: '55755895872',
          password: '*******',
          role: 'USER'
        }}
      />
    )

    expect(screen.getByText('Editar usuário')).toBeInTheDocument()
    expect(screen.getByText('Remover usuário')).toBeInTheDocument()
  })

  it('Renders not found component when user does not exist', () => {
    render(<Profile status={404} />)

    expect(screen.getByText('Oops')).toBeInTheDocument()
  })

  it('loads user data', async () => {
    const retriveUsersDataMocked = mocked(api.get)

    const user = {
      id: 5,
      firstName: 'Tiago',
      lastName: 'Márcio',
      birthDate: '07-05-1954',
      email: 'tiagomarcioalves@vemter.com',
      document: '49657903831',
      password: 'MTIzNDU2',
      role: 'ADMIN'
    }

    retriveUsersDataMocked.mockResolvedValue({
      data: user
    })

    const response = await getServerSideProps({ params: { id: '5' } } as any)

    const passwordMask = base64
      .decode(user.password)
      .split('')
      .map(() => '*')

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          user: { ...user, password: passwordMask.join('') }
        }
      })
    )
  })
})
