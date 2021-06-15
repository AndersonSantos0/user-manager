import Head from 'next/head'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { Screen } from '../../styles/global'
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
import PaginationIndex from '../../components/PaginationIndex'
import UsersNotFound from '../../components/UsersNotFound'

interface UserScreenProps {
  users: UserType[]
  totalUsers: number
  totalPages: number
  actualPage: number
}

const UsersScreen = ({
  users = [],
  totalUsers,
  totalPages,
  actualPage
}: UserScreenProps) => {
  const session = useSession()

  return (
    <Screen>
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
              {users.length === 0 ? (
                <UsersNotFound />
              ) : (
                <UsersTable data={users} />
              )}

              <footer>
                <p>{totalUsers} resultados</p>
                <PaginationIndex
                  actualPage={actualPage}
                  totalPages={totalPages}
                />
              </footer>
            </UsersContainer>
          </section>
        </UsersScreenContent>
      </UsersScreenContainer>
    </Screen>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { qtd, page, search } = ctx.query

  const quantity = qtd || 5
  const actualPage = Number(page) || 1

  const response = await api.get('/users', {
    params: {
      q: search,
      _limit: quantity,
      _page: actualPage
    }
  })

  const totalUsers = response.headers['x-total-count']
  const totalPages = Math.ceil(totalUsers / Number(quantity))

  return {
    props: {
      users: response.data,
      totalUsers,
      totalPages,
      actualPage
    }
  }
}

export default UsersScreen
