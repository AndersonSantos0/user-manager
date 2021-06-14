import Head from 'next/head'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import UsersTable from '../../components/UsersTable'
import AsideMenu from '../../components/AsideMenu'
import { api } from '../../services/api'
import { GetServerSideProps } from 'next'
import { UserType } from '../../types/user'
import { useSession } from '../../hooks/useSession'
import {
  UsersScreenContainer,
  UsersScreenContent,
  UsersContainer
} from '../../styles/pages/Users'

interface UserScreenProps {
  users: UserType[]
}

const UsersScreen = ({ users = [] }: UserScreenProps) => {
  const session = useSession()

  return (
    <div>
      <Head>
        <title>UserManager</title>
      </Head>
      <UsersScreenContainer>
        <UsersScreenContent>
          <AsideMenu />
          <section>
            <UsersContainer>
              <header>
                <h1>Usuários</h1>
                {session.user?.role === 'ADMIN' && (
                  <Link href="/users/create">
                    <a>
                      Adicionar usuário
                      <FiPlus size={'1.5rem'} />
                    </a>
                  </Link>
                )}
              </header>
              <UsersTable data={users} />
              <footer>
                <p>{users.length} resultados</p>
              </footer>
            </UsersContainer>
          </section>
        </UsersScreenContent>
      </UsersScreenContainer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get('/users')

  return {
    props: {
      users: response.data
    }
  }
}

export default UsersScreen
