import { useRouter } from 'next/router'
import { RiDashboardLine, RiUserLine } from 'react-icons/ri'
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import Link from 'next/link'
import { AsideMenuContainer } from './styles'
import { useTheme } from '../../hooks/useTheme'

const AsideMenu = () => {
  const router = useRouter()

  const { theme, switchTheme } = useTheme()

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
      <h1>Config</h1>
      <ul>
        <li>
          <a onClick={() => switchTheme()}>
            {theme === 'dark' ? (
              <FiToggleRight color="var(--primary)" />
            ) : (
              <FiToggleLeft />
            )}
            Dark mode
          </a>
        </li>
      </ul>
    </AsideMenuContainer>
  )
}

export default AsideMenu
