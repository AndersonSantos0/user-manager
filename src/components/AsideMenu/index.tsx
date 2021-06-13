import { useRouter } from 'next/router'
import { RiDashboardLine, RiUserLine } from 'react-icons/ri'
import Link from 'next/link'
import { AsideMenuContainer } from './styles'

const AsideMenu = () => {
  const router = useRouter()

  return (
    <AsideMenuContainer>
      <h1>Geral</h1>
      <ul>
        <li className={router.route === '/' ? 'active' : null}>
          <Link href="/">
            <a>
              <RiDashboardLine /> Dashboard
            </a>
          </Link>
        </li>
        <li className={router.route.includes('/users') ? 'active' : null}>
          <Link href="/users">
            <a>
              <RiUserLine /> Usuários
            </a>
          </Link>
        </li>
      </ul>
    </AsideMenuContainer>
  )
}

export default AsideMenu
