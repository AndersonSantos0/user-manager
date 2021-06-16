import { render, screen } from '@testing-library/react'
import AsideMenu from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        route: '/'
      }
    }
  }
})

describe('AsideMenu', () => {
  it('adds active class if the route path as same as link', () => {
    render(<AsideMenu />)

    expect(screen.getByText('Dashboard').parentElement).toHaveClass('active')
  })
})
