/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import RemoveUserModal from '.'
import { useSession } from '../../hooks/useSession'

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

describe('RemoveUserModal', () => {
  it('Shows logout message when session user as same as profile user', () => {
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
      <RemoveUserModal
        isOpen={true}
        onRequestClose={() => 'teste'}
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

    expect(
      screen.getByText('Após remover esse usuário você será deslogado')
    ).toBeInTheDocument()
  })
})
