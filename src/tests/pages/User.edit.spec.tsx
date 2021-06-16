/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from '../../hooks/useSession'
import UserEdit, { getServerSideProps } from '../../pages/users/edit/[id]'
import { api } from '../../services/api'
import base64 from 'base-64'

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

describe('User edit page', () => {
  it('Shows logout message when session user as same as profile user', () => {
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
        role: 'ADMIN'
      }
    } as any)

    render(
      <UserEdit
        status={200}
        user={{
          id: 5,
          firstName: 'Tiago',
          lastName: 'Márcio',
          birthDate: '07-05-1954',
          email: 'tiagomarcioalves@vemter.com',
          document: '49657903831',
          password: 'MTIzNDU2',
          role: 'ADMIN'
        }}
      />
    )

    expect(
      screen.getByText('Após editar esse usuário você será deslogado')
    ).toBeInTheDocument()
  })

  it('Renders not found component when user does not exist', () => {
    render(<UserEdit status={404} />)

    expect(screen.getByText('Oops')).toBeInTheDocument()
  })

  it('Renders internal server error component when server are off', () => {
    render(<UserEdit status={500} />)

    expect(
      screen.getByText(
        'Encontramos alguns problemas com o servidor, tente novamente mais tarde'
      )
    ).toBeInTheDocument()
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

    const passwordDecoded = base64.decode(user.password)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          user: { ...user, password: passwordDecoded }
        }
      })
    )
  })
})
