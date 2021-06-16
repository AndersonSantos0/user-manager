/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from '../../hooks/useSession'
import Users, { getServerSideProps } from '../../pages/users'
import { api } from '../../services/api'
import { UserType } from '../../types/user'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        route: '/users'
      }
    }
  }
})

jest.mock('../../hooks/useSession')
jest.mock('../../services/api')

const users: Omit<UserType, 'password'>[] = [
  {
    id: 1,
    firstName: 'Thomas',
    lastName: 'Hudson',
    birthDate: '24-12-1989',
    email: 'thomas.hudson@gmail.com',
    document: '52254883070',
    role: 'ADMIN'
  },
  {
    id: 2,
    firstName: 'Gallegos',
    lastName: 'Hopkins',
    birthDate: '24-10-1996',
    email: 'gallegos@hopkins.com',
    document: '28453844089',
    role: 'USER'
  }
]

describe('Users page', () => {
  it('renders correctly when user is logged-in as ADMIN', async () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
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
      <Users
        users={users}
        totalUsers={users.length}
        totalPages={1}
        actualPage={1}
      />
    )

    expect(screen.getAllByText('Usuários').length === 2)
    expect(screen.getByText('Adicionar usuário')).toBeInTheDocument()
  })

  it('renders correctly when user is logged-in as USER', async () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
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
      <Users
        users={users}
        totalUsers={users.length}
        totalPages={1}
        actualPage={1}
      />
    )

    expect(screen.getAllByText('Usuários').length === 2)
    expect(screen.getAllByText('Usuários')[1].nextElementSibling === null)
  })

  it('renders correctly when users data are empty', async () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
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

    render(<Users users={[]} totalUsers={0} totalPages={0} actualPage={1} />)

    expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument()
  })

  it('Renders internal server error component when server are off', () => {
    render(
      <Users
        users={[]}
        totalUsers={0}
        totalPages={0}
        actualPage={0}
        status={500}
      />
    )

    expect(
      screen.getByText(
        'Encontramos alguns problemas com o servidor, tente novamente mais tarde'
      )
    ).toBeInTheDocument()
  })

  it('loads users data', async () => {
    const retriveUsersDataMocked = mocked(api.get)

    retriveUsersDataMocked.mockResolvedValue({
      data: users,
      headers: { 'x-total-count': users.length }
    })

    const response = await getServerSideProps({} as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          users,
          totalUsers: users.length,
          totalPages: 1,
          actualPage: 1,
          status: 200
        }
      })
    )
  })
})
