import { render, screen } from '@testing-library/react'
import TopMenu from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        route: '/'
      }
    }
  }
})

jest.mock('../../hooks/useSession', () => {
  return {
    useSession() {
      return {
        session: true,
        user: {
          firstName: 'Tiago',
          lastName: 'Márcio',
          email: 'tiagomarcioalves@vemter.com'
        }
      }
    }
  }
})

describe('AsideMenu', () => {
  it('Renders correctly', () => {
    render(<TopMenu />)

    expect(screen.getByText('Tiago Márcio')).toBeInTheDocument()
    expect(screen.getByText('tiagomarcioalves@vemter.com')).toBeInTheDocument()
  })
})
